import { Component, inject } from '@angular/core';
import { TeamSelectComponent } from '../../../shared/ui/team-select/team-select.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  id: number;
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-menu',
  imports: [TeamSelectComponent, NzIconModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public router = inject(Router);
  public menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Home',
      icon: 'home',
      link: '/home',
    },
    {
      id: 2,
      title: 'Calendar',
      icon: 'calendar',
      link: '/calendar',
    },
    {
      id: 3,
      title: 'Favorites',
      icon: 'star',
      link: '/favorites',
    },
  ];

  public selectedItemId: number = 1;

  constructor() {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      const currentItem = this.menuItems.find(
        (item) => item.link === currentUrl
      );
      if (currentItem) {
        this.selectedItemId = currentItem.id;
      }
    });
  }

  public onClick(item: MenuItem): void {
    this.selectedItemId = item.id;
    this.router.navigate([item.link]);
  }
}
