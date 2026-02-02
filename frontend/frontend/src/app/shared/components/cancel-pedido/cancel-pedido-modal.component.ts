import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancel-pedido-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-pedido-modal.component.html',
  styleUrls: ['./cancel-pedido-modal.component.scss']
})
export class CancelPedidoModalComponent {
  @Input() show = false;
  @Input() pedido: any = null; // Ideally type Pedido, but loose for broad usage
  @Output() confirmed = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  motivo: string = '';

  onBackgroundClick() {
    this.cancelled.emit();
    this.motivo = '';
  }

  onClose() {
    this.cancelled.emit();
    this.motivo = '';
  }

  onConfirm() {
    if (this.motivo.trim()) {
      this.confirmed.emit(this.motivo.trim());
      this.motivo = '';
    }
  }
}
