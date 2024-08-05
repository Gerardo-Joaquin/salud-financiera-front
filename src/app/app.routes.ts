import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loginGuard } from './core/guards/login.guard';
import { dashboardGuard } from './core/guards/dashboard.guard';
import { userFormGuard } from './core/guards/user-form.guard';
import { SuccessComponent } from './components/success/success.component';
import { IndicesComponent } from './components/dashboard/indices/indices.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'estados-financieros',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: []
    },
    {
        path: 'indices',
        component: IndicesComponent,
        
    },
    {
        path: 'registro-empresa',
        component: UserFormComponent
    },
    {
        path: 'estados-financieros',
        component: DashboardComponent,
        canActivate: [dashboardGuard]
    },
];
