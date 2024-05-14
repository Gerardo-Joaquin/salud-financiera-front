import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  uploadForm(data: any): Observable<any> {
    return this.http.post(`${this.global.ENDPOINT}/user/send-form`, data)
  }
  getAddress(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
  }

  validateId(id: string): Observable<any> {
    return this.http.post(`${this.global.ENDPOINT}/user/validate_id`, { id })
  }
}
