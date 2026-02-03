import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../core/models/producto.model';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-producto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.scss']
})
export class EditarProductoModalComponent {
  @Input() producto: Producto | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<Producto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      unidadMedida: ['', Validators.required],
      precioReferencia: [''],
      disponible: [true, Validators.required]
    });
  }

  ngOnChanges() {
    if (this.producto) {
      this.form.patchValue(this.producto);
    } else {
      this.form.reset({ disponible: true });
    }
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit({ ...this.producto, ...this.form.value });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
