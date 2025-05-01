import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  CreateTeamPayload,
  Team,
  UpdateTeamDetailsPayload,
} from '../core/interfaces';
import {
  ActionResult,
  createValueFailure,
  createValueSuccess,
} from './helpers';
import { inject } from '@angular/core';
import { TeamsService } from '../core/services';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type TeamsState = {
  teams: Team[];
  getTeamsLoading: boolean;
  getTeamsResult: ActionResult;
  team: Team | null;
  getTeamLoading: boolean;
  getTeamResult: ActionResult;
  createTeamLoading: boolean;
  createTeamResult: ActionResult;
  updateTeamDetailsLoading: boolean;
  updateTeamDetailsResult: ActionResult;
  addTeamUsersLoading: boolean;
  addTeamUsersResult: ActionResult;
  removeTeamUsersLoading: boolean;
  removeTeamUsersResult: ActionResult;
  deleteTeamLoading: boolean;
  deleteTeamResult: ActionResult;
};

const initialState: TeamsState = {
  teams: [],
  getTeamsLoading: false,
  getTeamsResult: null,
  team: null,
  getTeamLoading: false,
  getTeamResult: null,
  createTeamLoading: false,
  createTeamResult: null,
  updateTeamDetailsLoading: false,
  updateTeamDetailsResult: null,
  addTeamUsersLoading: false,
  addTeamUsersResult: null,
  removeTeamUsersLoading: false,
  removeTeamUsersResult: null,
  deleteTeamLoading: false,
  deleteTeamResult: null,
};

export const TeamsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('Teams'),
  withMethods((store, teamsService = inject(TeamsService)) => ({
    getTeamsByOrganizationId: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getTeamsLoading: true })),
        switchMap((organizationId) => {
          return teamsService.getTeamsByOrganizationId(organizationId).pipe(
            tapResponse({
              next: (teams) => {
                patchState(
                  store,
                  createValueSuccess('teams', teams, 'getTeamsResult')
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, createValueFailure(error, 'getTeamsResult'));
              },
              finalize: () => patchState(store, { getTeamsLoading: false }),
            })
          );
        })
      )
    ),
    getTeamById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getTeamLoading: true })),
        switchMap((teamId) => {
          return teamsService.getTeamById(teamId).pipe(
            tapResponse({
              next: (team) => {
                patchState(
                  store,
                  createValueSuccess('team', team, 'getTeamResult')
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, createValueFailure(error, 'getTeamResult'));
              },
              finalize: () => patchState(store, { getTeamLoading: false }),
            })
          );
        })
      )
    ),
    createTeam: rxMethod<CreateTeamPayload>(
      pipe(
        tap(() => patchState(store, { createTeamLoading: true })),
        switchMap((payload) => {
          return teamsService.createTeam(payload).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'createTeamResult',
                    { status: 'success' },
                    'createTeamResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'createTeamResult')
                );
              },
              finalize: () => patchState(store, { createTeamLoading: false }),
            })
          );
        })
      )
    ),
    updateTeamDetails: rxMethod<UpdateTeamDetailsPayload>(
      pipe(
        tap(() => patchState(store, { updateTeamDetailsLoading: true })),
        switchMap((payload) => {
          return teamsService.updateTeamDetails(payload.id, payload).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'updateTeamDetailsResult',
                    { status: 'success' },
                    'updateTeamDetailsResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'updateTeamDetailsResult')
                );
              },
              finalize: () =>
                patchState(store, { updateTeamDetailsLoading: false }),
            })
          );
        })
      )
    ),
    addTeamUsers: rxMethod<{ id: number; userIds: number[] }>(
      pipe(
        tap(() => patchState(store, { addTeamUsersLoading: true })),
        switchMap(({ id, userIds }) => {
          return teamsService.addTeamUsers(id, userIds).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'addTeamUsersResult',
                    { status: 'success' },
                    'addTeamUsersResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'addTeamUsersResult')
                );
              },
              finalize: () => patchState(store, { addTeamUsersLoading: false }),
            })
          );
        })
      )
    ),
    removeTeamUsers: rxMethod<{ id: number; userIds: number[] }>(
      pipe(
        tap(() => patchState(store, { removeTeamUsersLoading: true })),
        switchMap(({ id, userIds }) => {
          return teamsService.removeTeamUsers(id, userIds).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'removeTeamUsersResult',
                    { status: 'success' },
                    'removeTeamUsersResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'removeTeamUsersResult')
                );
              },
              finalize: () =>
                patchState(store, { removeTeamUsersLoading: false }),
            })
          );
        })
      )
    ),
    deleteTeam: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { deleteTeamLoading: true })),
        switchMap((teamId) => {
          return teamsService.deleteTeam(teamId).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'deleteTeamResult',
                    { status: 'success' },
                    'deleteTeamResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'deleteTeamResult')
                );
              },
              finalize: () => patchState(store, { deleteTeamLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
