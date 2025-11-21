import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      // {
      //   path: 'sign-in',
      //   loadComponent: () =>
      //     import('./sign-in/sign-in.component').then(m => m.SignInComponent),
      // },
      // {
      //   path: 'sign-out',
      //   loadComponent: () =>
      //     import('./sign-out/sign-out.component').then(m => m.SignOutComponent),
      // },
    ],
  },
];
