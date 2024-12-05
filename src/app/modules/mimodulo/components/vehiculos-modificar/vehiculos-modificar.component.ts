import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Vehiculo } from '../../../../models/interfaces/vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehiculos-modificar',
  standalone: false,
  //imports: [],
  templateUrl: './vehiculos-modificar.component.html',
  styleUrl: './vehiculos-modificar.component.css'
})
export class VehiculosModificarComponent implements OnInit, OnChanges{
  form!: FormGroup;
  isLoading = false;  
  @Input() vehiculo!: Vehiculo;

  @Output() mandarVehiculo = new EventEmitter<Vehiculo>();
  

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

  ngOnChanges(changes: SimpleChanges): void {
    if(this.vehiculo && changes['vehiculo']){
      this.completarForm();      
    }
  }

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
  completarForm(){    
    const item: Vehiculo = {
      nombre: this.vehiculo.nombre,
      tipo:  this.vehiculo.tipo,
      ruedas: this.vehiculo.ruedas,
      capacidad: this.vehiculo.capacidad,
      estado: this.vehiculo.estado  
    }

    this.form.patchValue(item);
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