import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TeamsStore } from '../../../store/teams.store';
import { TimeOffEvent } from '../../interfaces';
import { TimeOffEventsStore } from '../../../store';

@Component({
  selector: 'app-calendar',
  imports: [NzPageHeaderModule, NzCalendarModule, FormsModule, NzPopoverModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  public date: Date = new Date();
  public previousDate: Date = new Date();
  public selectedTeam = inject(TeamsStore).selectedTeam;
  public timeOffEventsStore = inject(TimeOffEventsStore);
  public calendarTimeOffEvents: TimeOffEvent[] = [];
  public teamId: number | null = null;

  constructor() {
    effect(() => {
      this.calendarTimeOffEvents =
        this.timeOffEventsStore.calendarTimeOffEvents();
    });

    effect(() => {
      if (this.selectedTeam()) {
        this.teamId = this.selectedTeam()?.id!;
        this.getCalendarTimeOffEvents();
      }
    });
  }

  public onDateChange(event: Date): void {
    if (
      this.previousDate.getMonth() !== event.getMonth() ||
      this.previousDate.getFullYear() !== event.getFullYear()
    ) {
      this.getCalendarTimeOffEvents();
    }

    this.previousDate = this.date;
  }

  public isDateWithinEventRange(date: any, event: TimeOffEvent): boolean {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    return date >= startDate && date <= endDate;
  }

  private getCalendarTimeOffEvents(): void {
    this.timeOffEventsStore.getCalendarTimeOffEventsByTeamId({
      teamId: this.selectedTeam()?.id!,
      month: this.date.getMonth() + 1,
      year: this.date.getFullYear().toString(),
    });
  }
}
