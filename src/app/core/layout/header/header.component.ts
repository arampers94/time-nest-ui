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
  public isActionDropdownVisible = false;
  public currentDate = new Date();
  public actions = [
    { name: 'Schedule Time Off', icon: 'clock-circle' },
    { name: 'Create Team', icon: 'usergroup-add' },
    { name: 'Invite Team Members', icon: 'user-add' },
    { name: 'Join Team', icon: 'plus' },
  ];

  public onSelectAction(action: string) {
    this.isActionDropdownVisible = false;
  }
}
