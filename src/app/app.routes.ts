import { Routes } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';
import { CalendarComponent } from './core/features/calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./core/features/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./core/features/favorites/favorites.component').then(
            (m) => m.FavoritesComponent
          ),
      },
    ],
  },
];
