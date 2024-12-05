import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoferesService } from '../../../../services/choferes.service';

@Component({
  selector: 'app-choferes-form',
  standalone: false,
  //imports: [],
  templateUrl: './choferes-form.component.html',
  styleUrl: './choferes-form.component.css'
})
export class ChoferesFormComponent {

  form!: FormGroup;
  isLoading = false;
  @Input() selectedPais = '';

  constructor(private fb:FormBuilder, private repartidorService: ChoferesService) {}
    
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        nombre: ['',[Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
        dni: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]], 
        edad: [null, [Validators.min(18), Validators.max(50), Validators.required]],
        nrolicencia: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)]],
        licenciaprofesional: [null, Validators.required],
        pais: ['',Validators.required]
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.form && changes['selectedPais']) {//cuando cambia el valor de selectedPais haga lo que sigue
      this.mostrarPais();
      console.log(this.form.invalid);
    }
  }
  mostrarPais() {    
    this.form.get('pais')?.setValue(this.selectedPais); //para que lo tome el validator como ingresado. Se lo pasas directo al valor del formcontrol asociado al input, es decir directo a donde se hace la validacion        
  }


  get dni() {
    return this.form.get('dni');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get edad() {
    return this.form.get('edad');
  }
  get nrolicencia() {
    return this.form.get('nrolicencia');
  }
  get licenciaprofesional() {
    return this.form.get('licenciaprofesional');
  }  
  get pais() {
    return this.form.get('pais');
  }
  
  
  enviarForm() {    
    this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores    
    if (this.form.invalid) {
      return; // Si el formulario es inválido, no continuar
    }

    this.isLoading = true;  // Mostrar spinner

    const formData = this.form.value;    

    this.repartidorService.GuardarChofer(formData).subscribe({
      next: (response) => {
        console.log('Formulario enviado exitosamente', response);
        //this.toastSucces(); mensaje de que se envio
        this.isLoading = false;  //oculto spinner
        this.form.reset();  //reset form
      },
      error: (err) => {
        console.error('Error al enviar el formulario', err);
        //this.toastError(); mensaje de error
        this.isLoading = false;
      }
    });
    
  }

}
