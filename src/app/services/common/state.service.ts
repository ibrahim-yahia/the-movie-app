import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  map = new Map();

  constructor() {
  }
}
