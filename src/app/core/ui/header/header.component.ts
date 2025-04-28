import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  imports: [NzDropDownModule, NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public teams = [
    { name: 'Cross Center', id: 1 },
    { name: 'FPAR', id: 2 },
    { name: 'Prep Plus', id: 3 },
  ];

  public selectedTeam: string = this.teams[0].name;

  public onSelectTeam(team: { name: string; id: number }) {
    this.selectedTeam = team.name;
  }
}
