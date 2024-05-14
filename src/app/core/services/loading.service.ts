import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false;
  public $loading = this.getLoading();

  setLoading(loading: boolean) {
    this.loading = loading;
  };
  getLoading(): boolean {
    return this.loading;
  }

  constructor() { }

}
