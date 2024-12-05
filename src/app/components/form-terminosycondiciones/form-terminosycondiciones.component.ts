import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/interfaces/usuario';
import { usuarioExisteAsyncValidator } from '../../validadores/email';
import { Route, Router } from '@angular/router';
import { MensajeComponent } from "../mensaje/mensaje.component";

@Component({
  selector: 'app-form-terminosycondiciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MensajeComponent],
  templateUrl: './form-terminosycondiciones.component.html',
  styleUrl: './form-terminosycondiciones.component.css'
})
export class FormTerminosycondicionesComponent {
  public form!: FormGroup;
  formularioValido = false;

  showMensaje = false;
  message:string = '';  
  
  constructor(private fb:FormBuilder, public auth:Auth, private usuarioService:LoginService, private route:Router) {}

  ngOnInit(): void {
    this.formularioValido = false;
    this.form = this.fb.group(
      {
        aceptar: [null, Validators.required], 
        email: ['', [Validators.required, Validators.email], 
        [usuarioExisteAsyncValidator(this.auth)]]        
      }
    );
  }
  get email() {
    return this.form.get('email');
  }  
  get aceptar() {
    return this.form.get('aceptar');
  }  

  async registrarUsuario(): Promise<void>{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    
    this.formularioValido = true;

    let usuario:any;
    try{
      let user = await this.auth.currentUser;      
      let email:any = user?.email;      
      if(email != null){
        usuario = await this.usuarioService.GetUserPorEmail(email);        
      }
      let values = this.form.value;
      await this.usuarioService.ModificarUsuario(usuario.id, {esHabilitado : values.aceptar});
      usuario = await this.usuarioService.GetUserPorEmail(email);
      this.usuarioService.setUsuario(usuario);
      console.log('Usuario registrado y datos guardados:', usuario);
    }catch(error){
      console.error('Error al registrar usuario o guardar datos:', error);
    }    
  }

  enviarFormulario() {
    this.registrarUsuario()
    .then(() => {
      console.log('Formulario enviado y usuario registrado exitosamente');  
      this.route.navigate(['/home']);
    })
    .catch(error => {
      console.error('Error al registrar el usuario:', error);
    });    
  }

  salir(){
    if(this.formularioValido){
      this.formularioValido = false;
      return true;  
    }else{
      //alert('Aun no completó el registro');
      this.showToastMessage('Aun no completo el registro');
      return false;
    }
  }

  showToastMessage(message: string): void {
    this.message = message;
    this.showMensaje = true;


    setTimeout(() => {
      this.closeToast();
    }, 3000);  
  }

  
  closeToast(): void {
    this.showMensaje = false;
  }
}
