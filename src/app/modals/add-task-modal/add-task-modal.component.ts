import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TaskCreateDto } from '../../models/task.model';
import { format } from 'date-fns';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Input() currentStatusId?: number; // Asegúrate de que este valor se reciba correctamente
  @Output() close = new EventEmitter<void>();

  newTask: TaskCreateDto = {
    name: '',
    description: '',
    creationDate: this.formatDateISO(new Date()), // Formato ISO aquí
    dueDate: '', // Inicialmente vacío
    statusId: this.currentStatusId || 0 // Usa el valor del Input
  };

  newSkill: string = '';
  newExpertise: string = '';
  skills: string[] = [];
  expertiseList: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.isOpen) {
      console.log('Modal opened with Status ID:', this.currentStatusId);
    }
  }

  formatDateISO(date: Date): string {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"); // Formato ISO compatible con backend
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Convierte la fecha de vencimiento a formato ISO si está definida
    if (this.newTask.dueDate) {
      const date = new Date(this.newTask.dueDate);
      this.newTask.dueDate = this.formatDateISO(date);
    }

    this.addTask();
  }

  addTask(): void {
    const taskToSend: TaskCreateDto = {
      name: this.newTask.name,
      description: this.newTask.description,
      creationDate: this.newTask.creationDate,
      dueDate: this.newTask.dueDate,
      statusId: this.currentStatusId || 0, // Usa el valor del Input
      requiredSkills: this.skills.join(', '),
      requiredExpertise: this.expertiseList.join(', '),
    };

    // Imprime los datos en la consola del frontend antes de enviarlos
    console.log('Task data being sent to backend:', taskToSend);

    this.taskService.createTask(taskToSend).subscribe(
      (response) => {
        console.log("Task created successfully", response);
        this.close.emit(); // Emitir el evento close para cerrar el modal
      },
      (error) => {
        console.error("Error creating task", error);
      }
    );
  }

  addSkill(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.newSkill.trim()) {
      event.preventDefault(); // Evita el envío del formulario al presionar Enter
      this.skills.push(this.newSkill.trim());
      this.newSkill = ''; // Limpiar el campo
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter(s => s !== skill);
  }

  addExpertise(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.newExpertise.trim()) {
      event.preventDefault(); // Evita el envío del formulario al presionar Enter
      this.expertiseList.push(this.newExpertise.trim());
      this.newExpertise = ''; // Limpiar el campo
    }
  }

  removeExpertise(expertise: string): void {
    this.expertiseList = this.expertiseList.filter(e => e !== expertise);
  }

  onClose(): void {
    this.close.emit();
  }
}
