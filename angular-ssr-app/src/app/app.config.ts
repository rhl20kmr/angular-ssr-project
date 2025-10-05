import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withHashLocation()), provideHttpClient(withFetch(),withInterceptors([AuthInterceptor])),
      provideClientHydration(withEventReplay()),
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ]
};
