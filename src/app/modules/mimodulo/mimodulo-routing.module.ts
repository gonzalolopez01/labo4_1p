import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoferesAltaComponent } from './components/choferes-alta/choferes-alta.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { guardGuard } from '../../guards/guard.guard';
import { VehiculosAbmComponent } from './components/vehiculos-abm/vehiculos-abm.component';
import { guardTipoGuard } from '../../guards/guard-tipo.guard';


const routes: Routes = [

  {
    path: 'alta', component:ChoferesAltaComponent
  },
  {
    path: 'choferes', component:ChoferesComponent, canActivate:[guardGuard]
  },
  {
    path: 'vehiculos', component:VehiculosAbmComponent, canActivate:[guardGuard, guardTipoGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MimoduloRoutingModule { }
