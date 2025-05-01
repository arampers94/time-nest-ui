import { HttpErrorResponse } from "@angular/common/http";

export interface ApiError {
  error: HttpErrorResponse;
  message: string;
}