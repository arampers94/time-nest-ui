import { DatePipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TeamsStore, TimeOffEventsStore } from '../../../store';
import { Team } from '../../interfaces';

@Component({
  selector: 'app-header',
  imports: [
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
    DatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public readonly teamsStore = inject(TeamsStore);
  public readonly timeOffEventsStore = inject(TimeOffEventsStore);

  public isTeamDropdownVisible = false;
  public isActionDropdownVisible = false;
  public currentDate = new Date();
  public actions = [
    { name: 'Schedule Time Off', icon: 'clock-circle' },
    { name: 'Create Team', icon: 'usergroup-add' },
    { name: 'Invite Team Members', icon: 'user-add' },
    { name: 'Join Team', icon: 'plus' },
  ];

  constructor() {
    // Runs when user selects a team from the dropdown
    effect(() => {
      if (
        this.teamsStore.selectedTeam() &&
        this.teamsStore.selectedTeam()!.id
      ) {
        this.fetchTeamData(this.teamsStore.selectedTeam()!.id);
      }
    });
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public onSelectTeam(team: Team) {
    this.teamsStore.setSelectedTeam(team);
    this.isTeamDropdownVisible = false;
  }

  public onSelectAction(action: string) {
    this.isActionDropdownVisible = false;
  }

  private fetchData(): void {
    this.teamsStore.getTeamsByUserId(1);
  }

  private fetchTeamData(teamId: number): void {
    this.timeOffEventsStore.getCurrentTimeOffEventsByTeamId(teamId);
    this.timeOffEventsStore.getFutureTimeOffEventsByTeamId(teamId);
    this.teamsStore.getTeamById(teamId);
  }
}
