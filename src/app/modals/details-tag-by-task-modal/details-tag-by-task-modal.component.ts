import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag, Task } from '../../models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tag-selection-modal',
  templateUrl: './details-tag-by-task-modal.component.html',
})
export class TagSelectionModalComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  tags: Tag[] = [];
  isTagFunctionsModalOpen = false;  // Propiedad para controlar el estado del modal

  constructor(private tagService: TagService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags().subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      },
      (error) => {
        console.error('Error fetching tags:', error);
      }
    );
  }

  isTagAssigned(tag: Tag): boolean {
    return this.task?.tags.some(t => t.id === tag.id) || false;
  }

  toggleTagAssignment(tag: Tag): void {
    if (this.task) {
      if (this.isTagAssigned(tag)) {
        console.log('Removing tag:', tag.id, 'from task:', this.task.id);
        this.taskService.removeTagFromTask(tag.id, this.task.id).subscribe(
          () => {
            console.log('Tag removed successfully from task:', this.task?.id);
            this.task!.tags = this.task!.tags.filter(t => t.id !== tag.id);
          },
          (error) => {
            console.error('Error removing tag:', error);
          }
        );
      } else {
        console.log('Assigning tag:', tag.id, 'to task:', this.task.id);
        this.taskService.assignTagToTask(tag.id, this.task.id).subscribe(
          () => {
            console.log('Tag assigned successfully to task:', this.task?.id);
            this.task!.tags.push(tag);
          },
          (error) => {
            console.error('Error assigning tag:', error);
          }
        );
      }
    }
  }

  deleteTag(tagId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta etiqueta?')) {
      this.tagService.deleteTag(tagId).subscribe(
        response => {
          console.log('Etiqueta eliminada:', response.message);
          this.getTags(); // Volver a cargar las etiquetas
        },
        error => {
          console.error('Error eliminando etiqueta:', error);
        }
      );
    }
  }

  openTagFunctionsModal(): void {  // Método para abrir el modal
    this.isTagFunctionsModalOpen = true;
  }

  closeModal(): void {
    this.close.emit();
  }
}
