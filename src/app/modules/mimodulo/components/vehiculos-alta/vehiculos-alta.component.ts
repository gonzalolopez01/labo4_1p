import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from '../../../../models/interfaces/vehiculo';

@Component({
  selector: 'app-vehiculos-alta',
  standalone: false,
  //imports: [],
  templateUrl: './vehiculos-alta.component.html',
  styleUrl: './vehiculos-alta.component.css'
})
export class VehiculosAltaComponent implements OnInit{
  form!: FormGroup;
  isLoading = false;
  @Output() mandarVehiculo = new EventEmitter<Vehiculo>();
  
  //@Input() selectedPais = '';

  constructor(private fb:FormBuilder) {}
    
  ngOnInit(): void {
    this.form = this.fb.group(
      {//si uso interfaz estos campodes deben tener el mismo nombre de los atributos para que se aginen correctamente
        nombre: ['',[Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
        tipo: ['', [Validators.required]], 
        ruedas: [null, [Validators.min(0), Validators.max(6), Validators.required]],
        capacidad: [null, [Validators.min(2), Validators.max(100), Validators.required]],        
      }
    );
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.form && changes['selectedPais']) {//cuando cambia el valor de selectedPais haga lo que sigue
  //     this.mostrarPais();
  //     console.log(this.form.invalid);
  //   }
  // }
  // mostrarPais() {    
  //   this.form.get('pais')?.setValue(this.selectedPais); //para que lo tome el validator como ingresado. Se lo pasas directo al valor del formcontrol asociado al input, es decir directo a donde se hace la validacion        
  // }


  get nombre() {
    return this.form.get('nombre');
  }
  get tipo() {
    return this.form.get('tipo');
  }
  get ruedas() {
    return this.form.get('ruedas');
  }
  get capacidad() {
    return this.form.get('capacidad');
  }  

  enviarVehiculo() {    
    this.form.markAllAsTouched(); //marca todos los campos como tocados para mostrar errores        
    if (this.form.invalid) {
      return; //si el formulario es invalido no continuar
    }

    this.isLoading = true; //mostrar spinner

    const formData = this.form.value; 
    //le agrego el estado true porque fue dado de alta
    formData.estado = true;   

    this.mandarVehiculo.emit(formData);
    this.form.reset();
  }  
}
