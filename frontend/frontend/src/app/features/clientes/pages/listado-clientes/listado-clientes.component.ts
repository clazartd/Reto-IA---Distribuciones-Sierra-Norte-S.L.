import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClientesService } from '../../../../core/services/clientes.service';
import { SessionService } from '../../../../core/services/session.service';
import { Role } from '../../../../core/constants/roles.constants';

@Component({
  selector: 'app-listado-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  // MOCK DATA: Estos clientes son para pruebas visuales, eliminar después
  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Prueba',
      email: 'prueba@test.com',
      telefono: '123456789',
      direccion: 'Calle Prueba 123',
      provincia: 'Vigo',
      codigoPostal: '28001',
      contacto: 'Persona Test',
      activo: true,
      createdAt: new Date()
    },
    {
      id: 2,
      nombre: 'Cliente Test',
      email: 'cliente@test.com',
      telefono: '123456789',
      direccion: 'Calle Test 123',
      provincia: 'Madrid',
      codigoPostal: '28001',
      contacto: 'Persona Test',
      activo: true,
      createdAt: new Date()
    },
    {
      id: 3,
      nombre: 'Cliente Test',
      email: 'cliente@test.com',
      telefono: '123456789',
      direccion: 'Calle Test 123',
      provincia: 'Madrid',
      codigoPostal: '28001',
      contacto: 'Persona Test',
      activo: true,
      createdAt: new Date()
    }
  ];
  clientesFiltrados: Cliente[] = [];
  provinciasDisponibles: string[] = [];
  provinciaSeleccionada: string = '';
  busqueda: string = '';
  canEdit: boolean = false;

  constructor(
    private clientesService: ClientesService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    // SERVICIO deshabilitado temporalmente para pruebas mock
    // this.clientesService.getClientes().subscribe((clientes: Cliente[]) => {
    //   this.clientes = clientes;
    //   this.actualizarProvincias();
    //   this.filtrarClientes();
    // });

    this.actualizarProvincias();
    this.filtrarClientes();

    // Evaluar permisos de edición por rol
    const rol = this.sessionService.getUserRole();
    this.canEdit = [Role.COMERCIAL, Role.ADMINISTRACION, Role.DIRECCION].includes(rol as Role);
  }

  actualizarProvincias() {
    // Recolecta provincias únicas de los clientes
    const provinciasSet = new Set<string>();
    this.clientes.forEach(cliente => {
      if (cliente.provincia) provinciasSet.add(cliente.provincia);
    });
    this.provinciasDisponibles = Array.from(provinciasSet).sort();
  }

  onDelete(cliente: Cliente) {
    if (window.confirm(`¿Seguro que deseas eliminar a "${cliente.nombre}"?`)) {
      // Aquí iría la lógica real de borrado (servicio, etc.)
      console.log('Borrar cliente:', cliente);
    }
  }

  filtrarClientes() {
    const filtro = this.busqueda.trim().toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente => {
      const coincideTexto =
        (!filtro ||
          (cliente.nombre && cliente.nombre.toLowerCase().includes(filtro)) ||
          (cliente.email && cliente.email.toLowerCase().includes(filtro)) ||
          (cliente.telefono && cliente.telefono.toLowerCase().includes(filtro))
        );
      const coincideProvincia =
        (!this.provinciaSeleccionada ||
          cliente.provincia === this.provinciaSeleccionada);
      return coincideTexto && coincideProvincia;
    });
  }
}
