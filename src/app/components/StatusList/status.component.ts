import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service'; // Ajusta la ruta si es necesario
import { Status } from '../../models/task.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  statuses: Status[] = [];
  OpenModalAddStatus = false;


  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.statusService.getStatuses().subscribe(
      (data: Status[]) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error al obtener los estados:', error);
      }
    );
  }

  deleteStatus(id: number){
    this.statusService.deleteStatus(id).subscribe(
      (message: String) => {
        console.log(message);
        this.loadStatuses();
      },
      (error) => {
        console.error('Error al eliminar un estado:', error);
      }
    );
  }

  openAddStatusForm(){
    this.OpenModalAddStatus = true;
  }

  closeModal(): void {
    this.OpenModalAddStatus = false;
  }

  onStatusCreated(): void {
    this.loadStatuses(); // Actualiza la lista de estados después de crear uno
  }
}
