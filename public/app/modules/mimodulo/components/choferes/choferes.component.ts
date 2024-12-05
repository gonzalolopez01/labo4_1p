import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaisesService } from '../../../../services/paises.service';
import { ChoferesService } from '../../../../services/choferes.service';

@Component({
  selector: 'app-choferes',
  standalone: false,
  //imports: [],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css'
})
export class ChoferesComponent {

  items: any[] = [];
  // @Input() selectedItem!: any;
  selectedItem!: any;
  
  subscription!: Subscription; 
 
  keys: string[] = []; //para guardar los atributos/keys de objeto

  detallePais: any ;
  
  constructor(private choferesService: ChoferesService, private paisService: PaisesService) {}
  
  ngOnInit(): void {
    this.subscription = this.choferesService
    .items.subscribe((res: Object[])=>{
      this.items = res;      
    })
    console.log(this.items);  
  }

  ngOnDestroy(): void {
    console.log(this.items); 
    this.subscription.unsubscribe;

  } 

  mostrarItem(item:Object){
    this.selectedItem = item;
    console.log(this.selectedItem);
 
    this.keys = Object.keys(this.items[0].repartidor);

    //hago la parte de detalle pais
    this.paisService.GetDetallePais(this.selectedItem.chofer.pais).subscribe(
      (detallePais) => {
        if (detallePais) {
          this.detallePais = detallePais;
          console.log('detalle pais seleccionado', this.detallePais);
        } else {
          console.log('País no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el detalle del país', error);
      }
    );
    
  }
}
