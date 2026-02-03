import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-eliminar-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmar-eliminar-modal.component.html',
  styleUrls: ['./confirmar-eliminar-modal.component.scss']
})
export class ConfirmarEliminarModalComponent {
  @Input() isOpen = false;
  @Input() entityName = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
