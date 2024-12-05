import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../models/interfaces/usuario';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css'
})
export class FormRegistroComponent implements OnInit{
  public form!: FormGroup;
  
  constructor(private fb:FormBuilder, public auth:Auth, private usuarioService:LoginService, private route:Router) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        nombre: ['',[Validators.pattern('^[a-zA-Z]+$'), Validators.required]],        
        apellido: ['',[Validators.pattern('^[a-zA-Z]+$'), Validators.required]],                
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        tipo: ['', [Validators.required]]
      }
    );
  }

  get tipo() {
    return this.form.get('tipo');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get email() {
    return this.form.get('email');
  }  
  get password() {
    return this.form.get('password');
  }  

  async registrarUsuario(): Promise<void>{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    
    let usuario:Usuario;
    try{
      usuario = this.form.value;
      usuario.esHabilitado = false;
      //guardar usuario
      await this.usuarioService.AddUsuario(usuario);  
      //creo usuario en auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password);
      console.log(usuario);
    }catch(error){
      console.error('Error al registrar usuario o guardar datos:', error);
    }    
  }

  enviarFormulario() {
    this.registrarUsuario()
    .then(() => {
      console.log('Formulario enviado y usuario registrado exitosamente');   
      this.route.navigate(['terminosycondiciones']); 
    })
    .catch(error => {
      console.error('Error al registrar el usuario:', error);
    });    
  }

}
