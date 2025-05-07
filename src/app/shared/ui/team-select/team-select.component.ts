import { Component, effect, inject } from '@angular/core';
import { Team } from '../../../core/interfaces';
import { TeamsStore, TimeOffEventsStore } from '../../../store';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-team-select',
  imports: [FormsModule, NzDropDownModule, NzIconModule],
  templateUrl: './team-select.component.html',
  styleUrl: './team-select.component.scss',
})
export class TeamSelectComponent {
  public readonly teamsStore = inject(TeamsStore);
  public readonly timeOffEventsStore = inject(TimeOffEventsStore);

  public isTeamDropdownVisible = false;
  public selectedTeam: Team | null = null;

  constructor() {
    // Runs when user selects a team from the dropdown
    effect(() => {
      if (
        this.teamsStore.selectedTeam() &&
        this.teamsStore.selectedTeam()!.id
      ) {
        this.fetchTeamData(this.teamsStore.selectedTeam()!.id);
        this.selectedTeam = this.teamsStore.selectedTeam();
      }
    });
  }

  public onSelectTeam(team: Team) {
    this.teamsStore.setSelectedTeam(team);
    this.isTeamDropdownVisible = false;
  }

  private fetchTeamData(teamId: number): void {
    this.timeOffEventsStore.getCurrentTimeOffEventsByTeamId(teamId);
    this.timeOffEventsStore.getFutureTimeOffEventsByTeamId(teamId);
    this.teamsStore.getTeamById(teamId);
  }
}
