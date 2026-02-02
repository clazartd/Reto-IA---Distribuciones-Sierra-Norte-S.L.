import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';

@NgModule({
  imports: [CommonModule, PedidosRoutingModule, ConfirmModalComponent],
})
export class PedidosModule {}
