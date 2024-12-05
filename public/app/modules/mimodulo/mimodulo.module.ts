import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MimoduloRoutingModule } from './mimodulo-routing.module';
import { ChoferesAltaComponent } from './components/choferes-alta/choferes-alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoferesFormComponent } from './components/choferes-form/choferes-form.component';
import { ChoferesPaisesComponent } from './components/choferes-paises/choferes-paises.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { ChoferesTablaComponent } from './components/choferes-tabla/choferes-tabla.component';
import { ChoferesDetalleComponent } from './components/choferes-detalle/choferes-detalle.component';


@NgModule({
  declarations: [
   ChoferesAltaComponent,
   ChoferesFormComponent,
   ChoferesPaisesComponent,
   ChoferesComponent,
   ChoferesTablaComponent,
   ChoferesDetalleComponent
  ],
  imports: [
    CommonModule,
    MimoduloRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  exports:[
    ChoferesAltaComponent,
    ChoferesFormComponent,
    ChoferesPaisesComponent,
    ChoferesComponent,
    ChoferesTablaComponent,
    ChoferesDetalleComponent
  ]
})
export class MimoduloModule { }
