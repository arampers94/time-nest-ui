import { HttpErrorResponse } from '@angular/common/http';
import { handleError } from '../../core/helpers';
import { ApiError } from '../../core/interfaces';

export type SuccessResult = {
  status: 'success';
};

export type FailureResult = {
  status: 'failure';
  error: ApiError;
};

export type ActionResult = SuccessResult | FailureResult | null;

export function createValueSuccess<State, K extends keyof State>(
  valuePropName: K,
  value: State[K],
  resultPropName: keyof State
): Partial<State> {
  return {
    [valuePropName]: value,
    [resultPropName]: { status: 'success' } as SuccessResult,
  } as Partial<State>;
}

export function createValueFailure<State>(
  error: HttpErrorResponse,
  resultPropName: keyof State
): Partial<State> {
  return {
    [resultPropName]: {
      status: 'failure',
      error: handleError(error),
    } as FailureResult,
  } as Partial<State>;
}
