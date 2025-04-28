import { Component } from '@angular/core';
import { HomeComponent } from '../../features/home/home.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CalendarComponent } from '../../features/calendar/calendar.component';
import { FavoritesComponent } from '../../features/favorites/favorites.component';
import { NgComponentOutlet } from '@angular/common';

interface Tab {
  title: string;
  icon: string;
  component: any;
}

@Component({
  selector: 'app-body',
  imports: [NzTabsModule, NzIconModule, NgComponentOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  public HomeComponent = HomeComponent;
  public CalendarComponent = CalendarComponent;
  public FavoritesComponent = FavoritesComponent;
  public tabs: Tab[] = [
    {
      title: 'Home',
      icon: 'home',
      component: this.HomeComponent,
    },
    {
      title: 'Calendar',
      icon: 'calendar',
      component: this.CalendarComponent,
    },
    {
      title: 'Favorites',
      icon: 'star',
      component: this.FavoritesComponent,
    },
  ];

  public onTabChange(event: any): void {
    console.log('Tab changed:', event);
  }
}
