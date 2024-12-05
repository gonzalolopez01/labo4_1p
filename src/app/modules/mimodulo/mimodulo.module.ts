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
import { ChoferesPaisChoferComponent } from "./components/choferes-pais-chofer/choferes-pais-chofer.component";
import { VehiculosAbmComponent } from './components/vehiculos-abm/vehiculos-abm.component';
import { VehiculosAltaComponent } from './components/vehiculos-alta/vehiculos-alta.component';
import { VehiculosTablaComponent } from './components/vehiculos-tabla/vehiculos-tabla.component';
import { VehiculosBajaComponent } from './components/vehiculos-baja/vehiculos-baja.component';
import { VehiculosModificarComponent } from './components/vehiculos-modificar/vehiculos-modificar.component';


@NgModule({
  declarations: [
   ChoferesAltaComponent,
   ChoferesFormComponent,
   ChoferesPaisesComponent,
   ChoferesComponent,
   ChoferesTablaComponent,
   ChoferesDetalleComponent,
   ChoferesPaisChoferComponent,
   VehiculosAbmComponent,
   VehiculosAltaComponent,
   VehiculosTablaComponent,
   VehiculosBajaComponent,
   VehiculosModificarComponent
  ],
  imports: [
    CommonModule,
    MimoduloRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,    
],
  exports:[
    ChoferesAltaComponent,
    ChoferesFormComponent,
    ChoferesPaisesComponent,
    ChoferesComponent,
    ChoferesTablaComponent,
    ChoferesDetalleComponent,
    ChoferesPaisChoferComponent,
    VehiculosAbmComponent,
    VehiculosAltaComponent,
    VehiculosTablaComponent,
    VehiculosBajaComponent,
    VehiculosModificarComponent
  ]
})
export class MimoduloModule { }
