import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoaderService} from "../shared/services/loader.service";
import {catchError, finalize, throwError} from "rxjs";

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.show();


  return next(req).pipe(
    catchError((error) => {
      return throwError(() => error);
    }),
    finalize(() => loaderService.hide())
  );
};
