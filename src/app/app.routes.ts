import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loginGuard } from './core/guards/login.guard';
import { dashboardGuard } from './core/guards/dashboard.guard';
import { UserFormComponent } from './components/user-form/user-form.component';
import { userFormGuard } from './core/guards/user-form.guard';
import { SuccessComponent } from './components/success/success.component';
import { TablesComponent } from './components/dashboard/tables/tables.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'form',
        component: UserFormComponent,
        canActivate: [userFormGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [dashboardGuard]
    },
    {
        path: 'success',
        component: SuccessComponent,
    },
];
