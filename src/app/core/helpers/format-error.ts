import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../interfaces';
import { errorStrings } from '../strings/errors.strings';

export const formatError = (error: HttpErrorResponse): string =>
  error.error ? error.error.message || error.error.Message : error.message;

export const handleError = (error: HttpErrorResponse): ApiError => {
  const errorMessage =
    formatError(error) ??
    errorStrings
      .find((e) => e.key === 'server_connect_failure')!
      .value.toString();

  return { error, message: errorMessage };
};
