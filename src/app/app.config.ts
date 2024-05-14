import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { DashboardService } from './core/services/dashboard.service';
import { LoginService } from './core/services/login.service';

export const appConfig: ApplicationConfig = {
  providers: [
    DashboardService,
    LoginService,
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideAnimations(),
    provideToastr()
  ]
};
