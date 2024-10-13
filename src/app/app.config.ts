import {ApplicationConfig} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {
  provideHttpClient,
  withFetch, withInterceptors,
} from "@angular/common/http";
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {loggerInterceptor} from "./core/logger.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: "enabled",
      scrollPositionRestoration: "top"
    })),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loggerInterceptor
      ])
    ),
    provideAnimations(),
    provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
