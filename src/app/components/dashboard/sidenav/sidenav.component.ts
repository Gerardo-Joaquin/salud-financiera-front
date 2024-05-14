import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  public sections = [
    { title: 'DASHBOARD', icon: 'bi-speedometer' },
    {title: 'DATOS', icon: 'bi-file-spreadsheet'}
  ]
  url: string = ''
  constructor(
    private router: Router,
    public dashboardService: DashboardService,
  ) {

  }
  ngOnInit(): void {
    this.url = this.router.url.substring(1);
  }

  closeSession(): void {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-session')
    window.location.reload()
  }
  changeRoute(section: string) {
    this.dashboardService.setActualRoute(section.toLowerCase())
  }
}
