import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private taskAddedSubject = new BehaviorSubject<void>(undefined);
  taskAdded$ = this.taskAddedSubject.asObservable();

  taskAdded() {
    this.taskAddedSubject.next();
  }
}