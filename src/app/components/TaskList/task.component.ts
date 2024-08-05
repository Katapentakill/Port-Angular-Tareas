import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { EventService } from '../../services/event.service';
import { Task, TaskCreateDto } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() status: any; // Cambia 'any' por el tipo adecuado si tienes uno definido
  statusesWithTasks: Map<number, Task[]> = new Map();
  selectedTask: Task | null = null;
  isTaskDetailsModalOpen: boolean = false;
  isAddTaskModalOpen: boolean = false;
  currentStatusId: number | undefined = undefined;
  private eventSubscription?: Subscription;

  constructor(private taskService: TaskService, private eventService: EventService) {}

  ngOnInit(): void {
    if (this.status && this.status.id) {
      this.loadTasksForStatus(this.status.id);
    }
    this.eventSubscription = this.eventService.taskUpdated$.subscribe(
      (taskId: number) => {
        if (this.status && this.status.id) {
          this.loadTasksForStatus(this.status.id); // Recarga las tareas para el status actual
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  loadTasksForStatus(statusId: number): void {
    this.taskService.getTasksByStatus(statusId).subscribe(
      (tasks: Task[]) => {
        this.statusesWithTasks.set(statusId, tasks);
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  openTaskDetails(task: Task): void {
    this.selectedTask = task;
    this.isTaskDetailsModalOpen = true;
  }

  closeTaskDetailsModal(): void {
    this.isTaskDetailsModalOpen = false;
    this.selectedTask = null;
  }

  deleteTask(taskId: number, statusId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      (message: string) => {
        console.log(message);
        this.loadTasksForStatus(statusId);
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }

  openAddTaskModal(statusId: number): void {
    this.currentStatusId = statusId;
    console.log('Current Status ID:', this.currentStatusId);
    this.isAddTaskModalOpen = true;
  }

  closeAddTaskModal(): void {
    this.isAddTaskModalOpen = false;
    this.currentStatusId = undefined;
  }

  handleTaskSubmit(newTask: TaskCreateDto): void {
    this.taskService.createTask(newTask).subscribe(
      (task: Task) => {
        if (this.currentStatusId) {
          this.loadTasksForStatus(this.currentStatusId);
        }
        this.closeAddTaskModal();
      },
      (error) => {
        console.error('Error al crear la tarea:', error);
      }
    );
  }
}
