import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task, UserDto } from 'src/app/models/task.model';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-totals-user-modal',
  templateUrl: './user-totals-modal.component.html',
})
export class UserModalComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  users: UserDto[] = [];
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private eventService: EventService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe(
      (users: UserDto[]) => {
        this.users = users;
        console.log('Usuarios cargados:', this.users);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  closeModal(): void {
    this.close.emit();
  }

  assignUserToTask(user: UserDto): void {
    if (this.task && user) {
      this.taskService.assignTask(this.task.id, user.id).subscribe(
        () => {
          console.log(`Usuario ${user.email} asignado a la tarea ${this.task?.name}`);
          if(this.task){
            this.eventService.notifyTaskUpdated(this.task.id);
          }
          this.closeModal(); // Close the modal after assigning the user
        },
        (error) => {
          console.error('Error al asignar usuario a la tarea:', error);
        }
      );
    }
  }
}
