import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-calendar',
  imports: [NzPageHeaderModule, NzCalendarModule, FormsModule, NzPopoverModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  public date: Date = new Date();

  public onDateChange(event: any): void {
    console.log('date changed', event);
  }
}
