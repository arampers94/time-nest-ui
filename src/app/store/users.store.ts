import { inject } from '@angular/core';
import { User } from '../core/interfaces/user.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UsersService } from '../core/services';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {
  ActionResult,
  createValueFailure,
  createValueSuccess,
} from './helpers';
import { HttpErrorResponse } from '@angular/common/http';

type UsersState = {
  users: User[];
  getUsersLoading: boolean;
  getUsersResult: ActionResult;
  user: User | null;
  getUserLoading: boolean;
  getUserResult: ActionResult;
};

const initialState: UsersState = {
  users: [],
  getUsersLoading: false,
  getUsersResult: null,
  user: null,
  getUserLoading: false,
  getUserResult: null,
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, usersService = inject(UsersService)) => ({
    getUsersByOrganizationId: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getUsersLoading: true })),
        switchMap((organizationId: number) => {
          return usersService.getUsersByOrganizationId(organizationId).pipe(
            tapResponse({
              next: (users) => {
                patchState(
                  store,
                  createValueSuccess('users', users, 'getUsersResult')
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, createValueFailure(error, 'getUsersResult'));
              },
              finalize: () => patchState(store, { getUsersLoading: false }),
            })
          );
        })
      )
    ),
    getUserById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getUserLoading: true })),
        switchMap((userId: number) => {
          return usersService.getUserById(userId).pipe(
            tapResponse({
              next: (user) => {
                patchState(
                  store,
                  createValueSuccess('user', user, 'getUserResult')
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, createValueFailure(error, 'getUserResult'));
              },
              finalize: () => patchState(store, { getUserLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
