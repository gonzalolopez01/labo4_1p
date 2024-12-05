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
  @Output() showItem = new EventEmitter<any>(); 
  selectedItemId: any;

  show(pais: any, index: number) {
    this.selectedItemId = index;
   
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
