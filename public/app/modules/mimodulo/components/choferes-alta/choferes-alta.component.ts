import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaisesService } from '../../../../services/paises.service';

@Component({
  selector: 'app-choferes-alta',
  standalone: false,
  //imports: [],
  templateUrl: './choferes-alta.component.html',
  styleUrl: './choferes-alta.component.css'
})
export class ChoferesAltaComponent {

  paises: any[] = [];
  @Input() selectedPais: string = '';
  suscription!: Subscription; 
  
  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.suscription = this.paisesService.GetPaisesDeEuropaYAfrica()
    .subscribe(paises => {      
      this.paises = paises;      
      console.log(this.paises);
    });   
  }

  mostrarPais(pais: any) {
    this.selectedPais = pais;    
    //this.form.get('pais')?.setValue(pais); //para que lo tome el validator como ingresado. Se lo pasas directo al valor del formcontrol asociado al input, es decir directo a donde se hace la validacion
    //this.selectedContinent = this.selectedPais.continents[0];
    
  }
}
