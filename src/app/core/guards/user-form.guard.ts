import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { UserFormService } from '../services/user-form.service';
import { map } from 'rxjs';

export const userFormGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userService = inject(UserFormService)
  const id = route.queryParams['id'];
  if (id) {
    return userService.validateId(id).pipe((map((data: any) => {
      if (data) {
        if (data['RealizoEncuesta'] == 0) {
          return true;
        } else {
          return router.createUrlTree(['/success'])
        }
      } else {
        return router.createUrlTree(['/success'])
      }
    })));
  } else {
    return router.navigateByUrl('/success')
  }
};
