import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Ajusta esta ruta si es necesario
import { UserDto } from '../../models/task.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: UserDto[] = [];
  searchParams = {
    name: '',
    lastname: '',
    email: '',
    job: ''
  };
  showConfirmDialog = false;
  userIdToDelete: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.searchUsers(
      this.searchParams.name,
      this.searchParams.lastname,
      this.searchParams.email,
      this.searchParams.job
    ).subscribe(
      (data: UserDto[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  openConfirmDialog(userId: number): void {
    this.userIdToDelete = userId;
    this.showConfirmDialog = true;
  }

  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(
        (response) => {
          // Aquí puedes usar response.message si necesitas mostrarlo en la UI
          console.log(response.message);
          // Eliminar el usuario de la lista local después de la eliminación
          this.users = this.users.filter(user => user.id !== this.userIdToDelete);
          this.showConfirmDialog = false;
          this.userIdToDelete = null;
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      );
    }
  }

  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.userIdToDelete = null;
  }

  onSearch(): void {
    this.loadUsers();
  }
}
