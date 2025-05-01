import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  CreateTimeOffEventPayload,
  TimeOffEvent,
  UpdateTimeOffEventPayload,
} from '../core/interfaces';
import {
  ActionResult,
  createValueFailure,
  createValueSuccess,
} from './helpers';
import { inject } from '@angular/core';
import { TimeOffEventService } from '../core/services';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type TimeOffEventsState = {
  timeOffEvent: TimeOffEvent | null;
  getTimeOffEventLoading: boolean;
  getTimeOffEventResult: ActionResult;
  currentTimeOffEvents: TimeOffEvent[];
  getCurrentTimeOffEventsLoading: boolean;
  getCurrentTimeOffEventsResult: ActionResult;
  futureTimeOffEvents: TimeOffEvent[];
  getFutureTimeOffEventsLoading: boolean;
  getFutureTimeOffEventsResult: ActionResult;
  createTimeOffEventLoading: boolean;
  createTimeOffEventResult: ActionResult;
  updateTimeOffEventLoading: boolean;
  updateTimeOffEventResult: ActionResult;
  deleteTimeOffEventLoading: boolean;
  deleteTimeOffEventResult: ActionResult;
};

export const initialState: TimeOffEventsState = {
  timeOffEvent: null,
  getTimeOffEventLoading: false,
  getTimeOffEventResult: null,
  currentTimeOffEvents: [],
  getCurrentTimeOffEventsLoading: false,
  getCurrentTimeOffEventsResult: null,
  futureTimeOffEvents: [],
  getFutureTimeOffEventsLoading: false,
  getFutureTimeOffEventsResult: null,
  createTimeOffEventLoading: false,
  createTimeOffEventResult: null,
  updateTimeOffEventLoading: false,
  updateTimeOffEventResult: null,
  deleteTimeOffEventLoading: false,
  deleteTimeOffEventResult: null,
};

export const TimeOffEventsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('TimeOffEvents'),
  withMethods((store, timeOffEventsService = inject(TimeOffEventService)) => ({
    getTimeOffEventById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getTimeOffEventLoading: true })),
        switchMap((timeOffEventId: number) => {
          return timeOffEventsService.getTimeOffEventById(timeOffEventId).pipe(
            tap({
              next: (timeOffEvent) => {
                patchState(
                  store,
                  createValueSuccess(
                    'timeOffEvent',
                    timeOffEvent,
                    'getTimeOffEventResult'
                  )
                );
              },
              error: (error) => {
                patchState(
                  store,
                  createValueFailure(error, 'getTimeOffEventResult')
                );
              },
              finalize: () =>
                patchState(store, { getTimeOffEventLoading: false }),
            })
          );
        })
      )
    ),
    getCurrentTimeOffEventsByTeamId: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getCurrentTimeOffEventsLoading: true })),
        switchMap((teamId: number) => {
          return timeOffEventsService
            .getCurrentTimeOffEventsByTeamId(teamId)
            .pipe(
              tap({
                next: (currentTimeOffEvents) => {
                  patchState(
                    store,
                    createValueSuccess(
                      'currentTimeOffEvents',
                      currentTimeOffEvents,
                      'getCurrentTimeOffEventsResult'
                    )
                  );
                },
                error: (error) => {
                  patchState(
                    store,
                    createValueFailure(error, 'getCurrentTimeOffEventsResult')
                  );
                },
                finalize: () =>
                  patchState(store, { getCurrentTimeOffEventsLoading: false }),
              })
            );
        })
      )
    ),
    getFutureTimeOffEventsByTeamId: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getFutureTimeOffEventsLoading: true })),
        switchMap((teamId: number) => {
          return timeOffEventsService
            .getFutureTimeOffEventsByTeamId(teamId)
            .pipe(
              tap({
                next: (futureTimeOffEvents) => {
                  patchState(
                    store,
                    createValueSuccess(
                      'futureTimeOffEvents',
                      futureTimeOffEvents,
                      'getFutureTimeOffEventsResult'
                    )
                  );
                },
                error: (error) => {
                  patchState(
                    store,
                    createValueFailure(error, 'getFutureTimeOffEventsResult')
                  );
                },
                finalize: () =>
                  patchState(store, { getFutureTimeOffEventsLoading: false }),
              })
            );
        })
      )
    ),
    createTimeOffEvent: rxMethod<TimeOffEvent>(
      pipe(
        tap(() => patchState(store, { createTimeOffEventLoading: true })),
        switchMap((payload: CreateTimeOffEventPayload) => {
          return timeOffEventsService.createTimeOffEvent(payload).pipe(
            tap({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'createTimeOffEventResult',
                    { status: 'success' },
                    'createTimeOffEventResult'
                  )
                );
              },
              error: (error) => {
                patchState(
                  store,
                  createValueFailure(error, 'createTimeOffEventResult')
                );
              },
              finalize: () =>
                patchState(store, { createTimeOffEventLoading: false }),
            })
          );
        })
      )
    ),
    updateTimeOffEvent: rxMethod<UpdateTimeOffEventPayload>(
      pipe(
        tap(() => patchState(store, { updateTimeOffEventLoading: true })),
        switchMap((payload: UpdateTimeOffEventPayload) => {
          return timeOffEventsService.updateTimeOffEvent(payload).pipe(
            tap({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'updateTimeOffEventResult',
                    { status: 'success' },
                    'updateTimeOffEventResult'
                  )
                );
              },
              error: (error) => {
                patchState(
                  store,
                  createValueFailure(error, 'updateTimeOffEventResult')
                );
              },
              finalize: () =>
                patchState(store, { updateTimeOffEventLoading: false }),
            })
          );
        })
      )
    ),
    deleteTimeOffEvent: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { deleteTimeOffEventLoading: true })),
        switchMap((timeOffEventId: number) => {
          return timeOffEventsService.deleteTimeOffEvent(timeOffEventId).pipe(
            tap({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'deleteTimeOffEventResult',
                    { status: 'success' },
                    'deleteTimeOffEventResult'
                  )
                );
              },
              error: (error) => {
                patchState(
                  store,
                  createValueFailure(error, 'deleteTimeOffEventResult')
                );
              },
              finalize: () =>
                patchState(store, { deleteTimeOffEventLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
