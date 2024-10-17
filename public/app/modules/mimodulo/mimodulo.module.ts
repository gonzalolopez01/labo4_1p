import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MimoduloRoutingModule } from './mimodulo-routing.module';
import { ChoferesAltaComponent } from './components/choferes-alta/choferes-alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoferesFormComponent } from './components/choferes-form/choferes-form.component';
import { ChoferesPaisesComponent } from './components/choferes-paises/choferes-paises.component';


@NgModule({
  declarations: [
   ChoferesAltaComponent,
   ChoferesFormComponent,
   ChoferesPaisesComponent
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
    ChoferesPaisesComponent
  ]
})
export class MimoduloModule { }
