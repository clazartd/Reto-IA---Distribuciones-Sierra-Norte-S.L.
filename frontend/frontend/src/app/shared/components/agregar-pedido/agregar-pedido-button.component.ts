import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-pedido-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agregar-pedido-button.component.html',
  styleUrls: ['./agregar-pedido-button.component.scss']
})
export class AgregarPedidoButtonComponent {
  @Input() text: string = 'Agregar nuevo pedido';
  @Input() btnClass: string = 'btn btn-success';
  @Output() agregarPedido = new EventEmitter<void>();
}
