import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VehiculosAbmServiceService } from '../../../../services/vehiculos-abm-service.service';
import { Vehiculo } from '../../../../models/interfaces/vehiculo';

@Component({
  selector: 'app-vehiculos-abm',
  standalone: false,
  //imports: [],
  templateUrl: './vehiculos-abm.component.html',
  styleUrl: './vehiculos-abm.component.css'
})
export class VehiculosAbmComponent implements OnInit {
  isLoading = false;
  subscription!: Subscription;
  vehiculos: any[] = [];

  selectedItem!: any;

  constructor(private vehiculosService: VehiculosAbmServiceService) {}

  ngOnInit(): void {
    //me suscribo para recibir la coleccion de vehiculos
    // this.vehiculosService.GetVehiculos().subscribe(vehiculos =>{      
    // this.vehiculos = vehiculos;    
    // });
    this.vehiculosService.ObtenerVehiculosConEstadoTrue().subscribe(vehiculos =>{      
    this.vehiculos = vehiculos;    
    })
  }

  async GuardarVehiculo(formData: Vehiculo) {        
    this.isLoading = true;  //mostrar spinner

    try{      

      //devuelve promesa con ref al vehiculo ingresado
      const response = await this.vehiculosService.AddVehiculo(formData);
      console.log('Vehiculo dado de alta: ');

    } catch(error){
      console.log('Error al enviar el formulario: ',error);

    }finally{
      this.isLoading = false;
    }    
  }

  async  ModificarVehiculo(vehiculo:Vehiculo){       
    this.isLoading = true;  //mostrar spinner

    try{      

      //devuelve promesa con ref al vehiculo ingresado
      const response = await this.vehiculosService.ModificarItem(this.selectedItem.id, {
      ...vehiculo          
      // id: vehiculo.id,            // Propiedad 'id'
      // nombre: vehiculo.nombre,    // Propiedad 'nombre'
      // tipo: vehiculo.tipo,        // Propiedad 'tipo' (puede ser 'aereo', 'terrestre', 'maritimo' o null)
      // ruedas: vehiculo.ruedas,    // Propiedad 'ruedas'
      // capacidad: vehiculo.capacidad, // Propiedad 'capacidad'
      // estado: vehiculo.estado  
      });
      console.log('Vehiculo modificado: ');

    } catch(error){
      console.log('Error al enviar el formulario: ',error);

    }finally{
      this.isLoading = false;
    }     
  }
 

  tomarItem(item:Object){//tomo de la tabla
    this.selectedItem = item;     
    console.log('item seleccionado de la tabla:',item);     
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  } 
  

}
