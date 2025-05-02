import { DatePipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TeamsStore } from '../../../store';
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
  public teams: Team[] = [];

  public actions = [
    { name: 'Schedule Time Off', icon: 'clock-circle' },
    { name: 'Create Team', icon: 'usergroup-add' },
    { name: 'Invite Team Members', icon: 'user-add' },
    { name: 'Join Team', icon: 'plus' },
  ];

  public selectedTeam: string = '';
  public isTeamDropdownVisible = false;
  public isActionDropdownVisible = false;
  public currentDate: Date = new Date();

  constructor() {
    effect(() => {
      this.teams = this.teamsStore.teams();
      this.selectedTeam = this.teams[0]?.name || '';
    });
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public onSelectTeam(team: { name: string; id: number }) {
    this.selectedTeam = team.name;
    this.isTeamDropdownVisible = false;
  }

  public onSelectAction(action: string) {
    this.isActionDropdownVisible = false;
  }

  private fetchData(): void {
    this.teamsStore.getTeamsByUserId(1);
  }
}
