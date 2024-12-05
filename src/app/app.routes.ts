import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { FormTerminosycondicionesComponent } from './components/form-terminosycondiciones/form-terminosycondiciones.component';
import { registroGuard } from './guards/registro.guard';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent },
    { path: 'login', component:LoginComponent },
    { path: 'registro', component:FormRegistroComponent },
    { path: 'terminosycondiciones', component:FormTerminosycondicionesComponent, canDeactivate:[registroGuard] },

    {
        path:'abm',
        loadChildren:() => import('./modules/mimodulo/mimodulo.module')
        .then(m => m.MimoduloModule)              
    }
];
