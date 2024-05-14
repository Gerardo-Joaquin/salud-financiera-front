import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { RouterOutlet } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidenavComponent, DashboardInfoComponent, RouterOutlet, TablesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  menuOpen: boolean = false;
  constructor(
    public dashboardService: DashboardService,
  ) { }
  open() {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }


}
