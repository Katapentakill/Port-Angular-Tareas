import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, UserDto } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
})
export class UserModalReccomendedComponent {
  @Input() task: Task | null = null;
  @Input() isOpen: boolean = false;
  @Input() filteredUsers: UserDto[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() userSelected = new EventEmitter<UserDto>();

  selectedUser: UserDto | null = null;
  isUserDropdownOpen: boolean = false;

  constructor(private taskService: TaskService, private eventService: EventService) {}

  closeModal(): void {
    console.log('Cerrando modal de usuarios recomendados');
    this.close.emit();
  }

  selectUser(user: UserDto): void {
    this.userSelected.emit(user);
    this.closeModal();
  }

  assignUserToTask(user: UserDto): void {
    if (this.task && user) {
      this.taskService.assignTask(this.task.id, user.id).subscribe(
        () => {
          this.selectedUser = user;
          this.isUserDropdownOpen = false;
          console.log(`Usuario ${user.email} asignado a la tarea ${this.task?.name}`);
          if(this.task){
            this.eventService.notifyTaskUpdated(this.task.id);
          }
          this.closeModal(); 
        },
        (error) => {
          console.error('Error al asignar usuario a la tarea:', error);
        }
      );
    }
  }
}
