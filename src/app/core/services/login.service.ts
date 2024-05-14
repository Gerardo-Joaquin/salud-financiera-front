import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,

  ) { }
  loginUser(body: any): Observable<any> {
    return this.http.post(`${this.globalService.ENDPOINT}/user/auth`,body)
  }

  validateAccessToken(body: string): Observable<any> {
    return this.http.post(`${this.globalService.ENDPOINT}/user/validate_access_token`, body)
  }
}
