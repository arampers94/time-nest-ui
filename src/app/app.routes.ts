import { Routes } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';
import { CalendarComponent } from './core/features/calendar/calendar.component';
import { authRoutes } from './core/features/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'auth',
        loadComponent: () =>
          import('./core/features/auth/auth.component').then(
            (m) => m.AuthComponent
          ),
        children: [...authRoutes],
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
      {
        path: 'home',
        loadComponent: () =>
          import('./core/features/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
    ],
  },
];
