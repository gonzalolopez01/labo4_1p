import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-choferes-paises',
  standalone: false,
  //imports: [],
  templateUrl: './choferes-paises.component.html',
  styleUrl: './choferes-paises.component.css'
})
export class ChoferesPaisesComponent {
  @Input() items!: any[];
  @Output() showItem = new EventEmitter<any>(); //dispara evento
  selectedItemId: any;

  show(pais: any, index: number) {//este evento es el que se dispara
    this.selectedItemId = index;
    //this.showItem.emit(pais);//se va a emitir este pais desde showItem con el evento ($event)
    this.showItem.emit(pais.translations.spa.common);
    console.log(pais.translations.spa.common);
  }

  getColor(index: number) {
    if (index == this.selectedItemId) {
      return "red";
    }

    return "blue";
  }
}
