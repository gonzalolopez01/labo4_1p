import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoferesAltaComponent } from './components/choferes-alta/choferes-alta.component';
import { ChoferesComponent } from './components/choferes/choferes.component';


const routes: Routes = [

  {
    path: 'alta', component:ChoferesAltaComponent
  },
  {
    path: 'choferes', component:ChoferesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MimoduloRoutingModule { }
