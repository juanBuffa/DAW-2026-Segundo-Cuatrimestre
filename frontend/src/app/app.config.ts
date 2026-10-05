import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
