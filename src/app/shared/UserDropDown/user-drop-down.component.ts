import { Component, Input, OnInit } from '@angular/core';
import { Task, UserDto } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-drop-down',
  templateUrl: './user-drop-down.component.html',
})
export class UserDropDown implements OnInit {
  @Input() task: Task | null = null;
  users: UserDto[] = [];
  selectedUser: UserDto | null = null;
  isUserDropdownOpen = false;

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: UserDto[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  assignUserToTask(user: UserDto): void {
    if (this.task && user) {
      this.taskService.assignTask(this.task.id, user.id).subscribe(
        () => {
          this.selectedUser = user;
          this.isUserDropdownOpen = false;
          console.log(`Usuario ${user.email} asignado a la tarea ${this.task?.name}`);
        },
        (error) => {
          console.error('Error al asignar usuario a la tarea:', error);
        }
      );
    }
  }
}
