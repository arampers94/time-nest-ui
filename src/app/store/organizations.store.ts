import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CreateOrganizationPayload, Organization } from '../core/interfaces';
import {
  ActionResult,
  createValueFailure,
  createValueSuccess,
} from './helpers';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { OrganizationsService } from '../core/services/organizations.service';

type OrganizationsState = {
  organizations: Organization[];
  getOrganizationsLoading: boolean;
  getOrganizationsResult: ActionResult;
  organization: Organization | null;
  getOrganizationLoading: boolean;
  getOrganizationResult: ActionResult;
  createOrganizationLoading: boolean;
  createOrganizationResult: ActionResult;
  updateOrganizationLoading: boolean;
  updateOrganizationResult: ActionResult;
  deleteOrganizationLoading: boolean;
  deleteOrganizationResult: ActionResult;
};

const initialState: OrganizationsState = {
  organizations: [],
  getOrganizationsLoading: false,
  getOrganizationsResult: null,
  organization: null,
  getOrganizationLoading: false,
  getOrganizationResult: null,
  createOrganizationLoading: false,
  createOrganizationResult: null,
  updateOrganizationLoading: false,
  updateOrganizationResult: null,
  deleteOrganizationLoading: false,
  deleteOrganizationResult: null,
};

export const OrganizationsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('Organizations'),
  withMethods((store, organizationsService = inject(OrganizationsService)) => ({
    getOrganizations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { getOrganizationsLoading: true })),
        switchMap(() => {
          return organizationsService.getOrganizations().pipe(
            tapResponse({
              next: (organizations) => {
                patchState(
                  store,
                  createValueSuccess(
                    'organizations',
                    organizations,
                    'getOrganizationsResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'getOrganizationsResult')
                );
              },
              finalize: () =>
                patchState(store, { getOrganizationsLoading: false }),
            })
          );
        })
      )
    ),
    getOrganizationById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { getOrganizationLoading: true })),
        switchMap((organizationId: number) => {
          return organizationsService.getOrganizationById(organizationId).pipe(
            tapResponse({
              next: (organization) => {
                patchState(
                  store,
                  createValueSuccess(
                    'organization',
                    organization,
                    'getOrganizationResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'getOrganizationResult')
                );
              },
              finalize: () =>
                patchState(store, { getOrganizationLoading: false }),
            })
          );
        })
      )
    ),
    createOrganization: rxMethod<CreateOrganizationPayload>(
      pipe(
        tap(() => patchState(store, { createOrganizationLoading: true })),
        switchMap((payload) => {
          return organizationsService.createOrganization(payload).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'createOrganizationResult',
                    { status: 'success' },
                    'createOrganizationResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'createOrganizationResult')
                );
              },
              finalize: () =>
                patchState(store, { createOrganizationLoading: false }),
            })
          );
        })
      )
    ),
    updateOrganization: rxMethod<{
      id: number;
      name: string;
      email_domain: string;
    }>(
      pipe(
        tap(() => patchState(store, { updateOrganizationLoading: true })),
        switchMap((payload) => {
          return organizationsService
            .updateOrganization(payload.id, payload)
            .pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    createValueSuccess(
                      'updateOrganizationResult',
                      { status: 'success' },
                      'updateOrganizationResult'
                    )
                  );
                },
                error: (error: HttpErrorResponse) => {
                  patchState(
                    store,
                    createValueFailure(error, 'updateOrganizationResult')
                  );
                },
                finalize: () =>
                  patchState(store, { updateOrganizationLoading: false }),
              })
            );
        })
      )
    ),
    deleteOrganization: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { deleteOrganizationLoading: true })),
        switchMap((organizationId: number) => {
          return organizationsService.deleteOrganization(organizationId).pipe(
            tapResponse({
              next: () => {
                patchState(
                  store,
                  createValueSuccess(
                    'deleteOrganizationResult',
                    { status: 'success' },
                    'deleteOrganizationResult'
                  )
                );
              },
              error: (error: HttpErrorResponse) => {
                patchState(
                  store,
                  createValueFailure(error, 'deleteOrganizationResult')
                );
              },
              finalize: () =>
                patchState(store, { deleteOrganizationLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
