import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Vehiculo } from '../../../../models/interfaces/vehiculo';
import { VehiculosAbmServiceService } from '../../../../services/vehiculos-abm-service.service';

@Component({
  selector: 'app-vehiculos-baja',
  standalone: false,
  //imports: [],
  templateUrl: './vehiculos-baja.component.html',
  styleUrl: './vehiculos-baja.component.css'
})
export class VehiculosBajaComponent {
  isLoading = false; 
  @Input() vehiculo!: Vehiculo;
  
  isMarked: boolean = false;

  constructor(private vehiculosService: VehiculosAbmServiceService){}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['helado']){
      
  //   }
  // }

  // bajaVehiculo(){
  //   this.vehiculosService.BajaItem(this.vehiculo.id);
  //   this.isMarked = false;
  // }
  async bajaVehiculo(){
    this.isLoading = true;  //mostrar spinner
    try{
      const response = await this.vehiculosService.BajaItem(this.vehiculo.id!);
      console.log('Elemento eliminado: ',response);

    } catch(error){
      console.log('Error al dar de baja. ',error);
    }finally{
      this.isLoading = false;
      this.isMarked = false;
    }
  }

}
