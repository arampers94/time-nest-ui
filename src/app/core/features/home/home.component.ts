import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListComponent } from '../../../shared/ui/list/list.component';
import { ListData } from '../../interfaces';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-home',
  imports: [NzInputModule, NzIconModule, ListComponent, NzDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public currentOOOListData: ListData[] = [
    {
      title: 'John Doe',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Returns tomorrow',
    },
    {
      title: 'Jane Doe',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Returns in 3 days (Wednesday, April 30th)',
    },
    {
      title: 'Amar Rampersaud',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Returns in 7 days (Monday, May 5th)',
    },
  ];

  public upcomingOOOListData: ListData[] = [
    {
      title: 'John Doe',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Out starting tomorrow',
    },
    {
      title: 'Jane Doe',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Out starting in 3 days (Wednesday, April 30th)',
    },
    {
      title: 'Amar Rampersaud',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Out starting in 7 days (Monday, May 5th)',
    },
  ];

  public teamMembersListData: ListData[] = [
    {
      title: 'Amar Rampersaud',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Working today',
    },
    {
      title: 'Matt Collins',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Working today',
    },
    {
      title: 'Mike Lightner',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Working today',
    },
  ];
}
