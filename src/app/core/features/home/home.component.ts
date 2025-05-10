import { Component, effect, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListComponent } from '../../../shared/ui/list/list.component';
import { ListData } from '../../interfaces';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TeamsStore, TimeOffEventsStore } from '../../../store';
import { DatePipe } from '@angular/common';
import { getUserColorAvatar } from '../../helpers';

@Component({
  selector: 'app-home',
  imports: [NzInputModule, NzIconModule, ListComponent, NzDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public readonly timeOffEventsStore = inject(TimeOffEventsStore);
  public readonly teamsStore = inject(TeamsStore);

  public currentTimeOffListData: ListData[] = [];
  public futureTimeOffListData: ListData[] = [];
  public teamMembersListData: ListData[] = [];

  public getUserColorAvatar = getUserColorAvatar;

  constructor() {
    effect(() => {
      this.currentTimeOffListData = this.timeOffEventsStore
        .currentTimeOffEvents()
        .map((event) => ({
          name: `${event.user.first_name} ${event.user.last_name}`,
          user: event.user,
          description: `Returns on ${new DatePipe('en-US').transform(
            event.end_date,
            'mediumDate'
          )}`,
        }));

      this.futureTimeOffListData = this.timeOffEventsStore
        .futureTimeOffEvents()
        .map((event) => ({
          name: `${event.user.first_name} ${event.user.last_name}`,
          user: event.user,
          description: `Out starting on ${new DatePipe('en-US').transform(
            event.start_date,
            'mediumDate'
          )}`,
        }));

      this.teamMembersListData =
        this.teamsStore.team()?.users.map((user) => ({
          name: `${user.first_name} ${user.last_name}`,
          user,
          description: user.title || '',
        })) ?? [];
    });
  }
}
