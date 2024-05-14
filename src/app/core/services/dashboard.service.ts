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

  getCommentsUsers(): Observable<any> {
    return this.http.get(`${this.global.ENDPOINT}/dashboard/comments_users`)
  }
  getUsersParentInfo(skip: number = 0, limit: number = 10, allData: boolean = false): Observable<any> {
    return this.http.get(`${this.global.ENDPOINT}/dashboard/user-parents?skip=${skip}&limit=${limit}&all_data=${allData}`)
  }
  getUsersParentQuestions(skip: number = 0, limit: number = 10): Observable<any> {
    return this.http.get(`${this.global.ENDPOINT}/dashboard/question-parents?skip=${skip}&limit=${limit}`)
  }

  getActualRoute(): string {
    return this.actualRoute;
  }
  setActualRoute(route: string): void {
    this.actualRoute = route;
  }
}
