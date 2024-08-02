import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusService } from '../../services/status.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-add-status-modal',
  templateUrl: './add-status-modal.component.html',
})
export class AddStatusModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() statusCreated = new EventEmitter<void>();

  newStatusName: string = '';

  constructor(private statusService: StatusService) {}

  onSubmit(): void {
    if (this.newStatusName.trim()) {
      this.statusService.createStatus(this.newStatusName).subscribe(
        response => {
          console.log(response.message);
          this.statusCreated.emit();
          this.onClose();
        },
        error => {
          console.error('Error creating status:', error);
        }
      );
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
