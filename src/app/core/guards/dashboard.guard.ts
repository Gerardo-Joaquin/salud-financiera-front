import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

export const dashboardGuard: CanActivateFn = (_route, _state) => {

  
  const d = inject(DashboardService)

  if (localStorage.getItem('data')) {
    d.setActualRoute('estados-financieros')

  } else {
    d.setActualRoute('not-found')
  }
  return true;
  // const router = inject(Router)
  // const auth = inject(LoginService)

  // const token = localStorage.getItem('user-token');
  // if (token) {
  //   return auth.validateAccessToken(token).pipe(map((data: any) => {
  //     if (!data.error) {
  //       console.log(data);
  //       return true;
  //     } else {
  //       return router.parseUrl('/login')
  //     }
  //   }))
  // } else {
  //   return router.parseUrl('/login')
  // }
};
