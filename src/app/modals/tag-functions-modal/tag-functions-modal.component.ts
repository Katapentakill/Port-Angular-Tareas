import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTagDto } from '../../models/task.model';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tag-functions-modal',
  templateUrl: './tag-functions-modal.component.html',
})
export class TagFunctionsComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() tagCreated = new EventEmitter<void>(); // Evento para notificar la creación de una etiqueta

  tagForm: FormGroup;

  constructor(private fb: FormBuilder, private tagService: TagService) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      const newTag: CreateTagDto = this.tagForm.value;
      this.tagService.createTag(newTag).subscribe(
        response => {
          console.log('Tag creado con éxito:', response);
          this.tagCreated.emit(); // Emitir el evento tagCreated
          this.closeModal();
        },
        error => {
          console.error('Error al crear el tag:', error);
          alert('Error al crear el tag: ' + error.error.message);
        }
      );
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
