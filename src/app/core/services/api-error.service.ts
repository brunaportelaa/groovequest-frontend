import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiError } from '../models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {
  toApiError(error: unknown) : ApiError {
    if (error instanceof HttpErrorResponse){
      return {
        message: this.getMessage(error),
        status: error.status,
        details: typeof error.error === 'string' ? error.error : undefined,
      }
    } 

    return { 
      message: 'An unexpected error occurred.',
    }
  }

  

  private getMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.status === 0) {
      return 'Unable to connect to the server.';
    }

    if (error.status === 404 ) {
      return 'The requested resource was not found.';
    }

    return 'Request failed. Please try again.';
  }
}
