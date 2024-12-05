import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Vehiculo } from '../../../../models/interfaces/vehiculo';

@Component({
  selector: 'app-vehiculos-tabla',
  standalone: false,
  //imports: [],
  templateUrl: './vehiculos-tabla.component.html',
  styleUrl: './vehiculos-tabla.component.css'
})
export class VehiculosTablaComponent{
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.items && changes['keys']) {//cuando cambia el valor de selectedPais haga lo que sigue
  //     this.keys = Object.keys(this.items[0]);
  //     console.log(this.keys);
  //   }
  // }
  
  @Input() items!: Vehiculo[];
  @Output() showItem = new EventEmitter<any>(); //dispara evento - de hijo a padre
  selectedItemId: any;
       

  show(item: any, index: number){//este metodo dispara el evento
    this.selectedItemId = index;
    this.showItem.emit(item); //sale
  }
  getColor(index: number) {
    if (index == this.selectedItemId) {
      return "red";
    }

    return "blue";
  }
}
