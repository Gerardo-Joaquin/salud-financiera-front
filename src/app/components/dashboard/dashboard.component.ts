import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { RouterOutlet } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { IndicesComponent } from './indices/indices.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ProjectionsComponent } from "./projections/projections.component";
import { HorizontalComponent } from "./horizontal/horizontal.component";
import { VerticalComponent } from './vertical/vertical.component';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    SidenavComponent,
    DashboardInfoComponent,
    RouterOutlet,
    IndicesComponent,
    UserFormComponent,
    ProjectionsComponent,
    ProjectionsComponent, HorizontalComponent,
    VerticalComponent, NotFoundComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  menuOpen: boolean = false;
  constructor(
    public dashboardService: DashboardService,
  ) { }
  open(isOpen: boolean) {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }


}
