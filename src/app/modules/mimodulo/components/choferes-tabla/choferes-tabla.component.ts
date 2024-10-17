import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-choferes-tabla',
  standalone: false,
  //imports: [],
  templateUrl: './choferes-tabla.component.html',
  styleUrl: './choferes-tabla.component.css'
})
export class ChoferesTablaComponent {

  @Input() items!: any[];
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
