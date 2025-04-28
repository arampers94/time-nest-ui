import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

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
export class HeaderComponent {
  public teams = [
    { name: 'Cross Center', id: 1 },
    { name: 'FPAR', id: 2 },
    { name: 'Prep Plus', id: 3 },
  ];

  public actions = [
    { name: 'Schedule Time Off', icon: 'clock-circle' },
    { name: 'Create Team', icon: 'usergroup-add' },
    { name: 'Invite Team Members', icon: 'user-add' },
    { name: 'Join Team', icon: 'plus' },
  ];

  public selectedTeam: string = this.teams[0].name;
  public isTeamDropdownVisible = false;
  public isActionDropdownVisible = false;
  public currentDate: Date = new Date();

  public onSelectTeam(team: { name: string; id: number }) {
    this.selectedTeam = team.name;
    this.isTeamDropdownVisible = false;
  }

  public onSelectAction(action: string) {
    this.isActionDropdownVisible = false;
  }
}
