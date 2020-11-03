import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private map = new Map();

  constructor() {
  }

  get(key): any {
    return this.map.get(key);
  }

  set(key, value): any {
    this.map.set(key, value);
  }
}
