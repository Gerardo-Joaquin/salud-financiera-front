import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  actualRoute = 'dashboard'

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  chargeFile(fd: FormData): Observable<any> {
    return this.http.post(`${this.global.ENDPOINT}/upload-file`,fd)
  }

  getActualRoute(): string {
    return this.actualRoute;
  }
  setActualRoute(route: string): void {
    this.actualRoute = route;
  }
}
