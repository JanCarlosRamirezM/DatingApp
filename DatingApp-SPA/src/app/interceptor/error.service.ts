import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HTTP_INTERCEPTORS, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ErrorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.errorMethod));
  }

  errorMethod(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      const applicationError = error.headers.get("Application-Error");

      if (applicationError) {
        return throwError(applicationError);
      }
      const serverError = error.error;
      let modelStateErrors = "";

      if (serverError && typeof serverError === "object") {
        for (const key in serverError) {
          if (serverError[key]) {
            modelStateErrors += serverError[key] + "\n";
          }
        }
      }

      return throwError(modelStateErrors || serverError || "Server error");
    } else {
      return throwError(error);
    }
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorService,
  multi: true,
};
