import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, NgbModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  @Output() open: EventEmitter<boolean> = new EventEmitter();
  public sections = [
    { title: 'Edo. financiero', icon: 'bi-speedometer', router: 'estados-financieros'},
    { title: 'Indices', icon: 'bi-graph-up', router: 'indices'},
    {title: 'Vertical', icon: 'bi-bar-chart-fill', router: 'vertical'},
    {title: 'Horizontal', icon: 'bi-bar-chart-steps', router: 'horizontal'},
    {title: 'Proyecciones', icon: 'bi-kanban', router: 'proyecciones'},
    // {title: 'Empresas', icon: 'bi-building-fill', router: 'empresas'},
  ]
  url: string = ''

  emptyData = false
  isOpen = true;
  constructor(
    private router: Router,
    public dashboardService: DashboardService,
  ) {

  }
  ngOnInit(): void {
    this.url = this.router.url.substring(1);
    if(!localStorage.getItem('data')) {
      this.sections = []
      this.emptyData = true
    }
  }
  openNav() {
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen)
  }

  closeSession(): void {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-session')
    window.location.reload()
  }
  openChargeFile() {
    const file =document.getElementById('file_charge') as HTMLInputElement
    file.click()
  }
  changeRoute(section: string) {
    console.log(section);
    this.dashboardService.setActualRoute(section.toLowerCase())
  }
  onFileChange(ev: any) {
    const target = ev.target
    if (target.files && target.files.length > 0) {
      console.log(target.files[0]);
      const formData = new FormData()
      formData.append('file', target.files[0])
      this.dashboardService.chargeFile(formData).subscribe(data => {
        // console.log(d/ata);
        const cleanedJson = this.cleanJson(data)
        localStorage.setItem('data', cleanedJson)
        location.reload()
      })
    }
  }
  cleanJson(jsonString: string): string {
     // Reemplaza 'Infinity' y '-Infinity' con 'null'
  return jsonString
  .replace(/Infinity/g, 'null')
  .replace(/-Infinity/g, 'null')
  .replace(/NaN/g, 'null');
  }
}
