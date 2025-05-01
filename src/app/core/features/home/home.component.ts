import { Component, effect, inject, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListComponent } from '../../../shared/ui/list/list.component';
import { ListData } from '../../interfaces';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TimeOffEventsStore } from '../../../store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NzInputModule, NzIconModule, ListComponent, NzDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public currentTimeOffListData: ListData[] = [];
  public futureTimeOffListData: ListData[] = [];

  public teamMembersListData: ListData[] = [
    {
      name: 'Amar Rampersaud',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Working today',
    },
    {
      name: 'Matt Collins',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Working today',
    },
    {
      name: 'Mike Lightner',
      avatar: 'https://joesch.moe/api/v1/random',
      description: 'Working today',
    },
  ];

  public readonly timeOffEventsStore = inject(TimeOffEventsStore);

  constructor() {
    effect(() => {
      this.currentTimeOffListData = this.timeOffEventsStore
        .currentTimeOffEvents()
        .map((event) => ({
          name: `${event.user.first_name} ${event.user.last_name}`,
          avatar: 'https://joesch.moe/api/v1/random',
          description: `Returns on ${new DatePipe('en-US').transform(
            event.end_date,
            'mediumDate'
          )}`,
        }));

      this.futureTimeOffListData = this.timeOffEventsStore
        .futureTimeOffEvents()
        .map((event) => ({
          name: `${event.user.first_name} ${event.user.last_name}`,
          avatar: 'https://joesch.moe/api/v1/random',
          description: `Out starting on ${new DatePipe('en-US').transform(
            event.start_date,
            'mediumDate'
          )}`,
        }));
    });
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.timeOffEventsStore.getCurrentTimeOffEventsByTeamId(1);
    this.timeOffEventsStore.getFutureTimeOffEventsByTeamId(1);
  }
}
