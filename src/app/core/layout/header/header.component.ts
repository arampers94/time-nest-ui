import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  public router = inject(Router);

  public onSelectAction(action: string): void {
    this.isActionDropdownVisible = false;
  }

  public navigateToSignUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }
}
