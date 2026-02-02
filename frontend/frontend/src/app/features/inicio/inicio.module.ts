import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InicioComponent
  ],
  exports: []
})
export class InicioModule { }
