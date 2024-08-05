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

}
