import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Preset} from './preset';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private messageSource = new BehaviorSubject<Array<Preset>>(null);
  presetArray = this.messageSource.asObservable();
  constructor() { }

  updateArray(array) {
    this.presetArray = array;
  }
}
