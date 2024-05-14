import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // ENDPOINT = 'https://bbtips.link'
  ENDPOINT = 'http://localhost:8000'

  constructor() { }
}
