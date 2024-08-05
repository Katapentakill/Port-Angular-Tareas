import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private taskUpdatedSource = new Subject<number>();
  taskUpdated$ = this.taskUpdatedSource.asObservable();

  notifyTaskUpdated(taskId: number): void {
    console.log("Evento llamado", taskId)
    this.taskUpdatedSource.next(taskId);
  }
}
