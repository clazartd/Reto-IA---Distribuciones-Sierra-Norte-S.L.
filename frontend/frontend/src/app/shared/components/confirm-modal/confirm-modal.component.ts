import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'confirm-modal.component.html',
  styleUrls: ['confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onBackgroundClick() {
    this.cancelled.emit();
  }

  onClose() {
    this.cancelled.emit();
  }

  onConfirm() {
    this.confirmed.emit();
  }
}
