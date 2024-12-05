import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = "Login";

  userMail = "";
  userPWD = "";
  tipo = "";

  loggedUser:any;
  cargado = true;
  msjError = "";

  constructor(private router: Router, public auth: Auth, private usuarioService: LoginService){ } 

  async Login() {
    try {
      // Iniciar sesión con email y contraseña
      const res = await signInWithEmailAndPassword(this.auth, this.userMail, this.userPWD);
  
      // Obtener el usuario por email
      const loggedUser = await this.usuarioService.GetUserPorEmail(this.userMail);
  
      // Guardar el usuario en el servicio
      
      this.usuarioService.setUsuario(loggedUser);
      this.loggedUser = this.usuarioService.usuarioLogeado;
      console.log('usuario logeado obtenido desde el servicio',this.loggedUser);
  
      if(this.loggedUser.esHabilitado === false){
        this.router.navigate(['/terminosycondiciones']);
      }
    } catch (e: any) {
      // Manejo de errores
      this.msjError = this.getErrorMessage(e.code);
      console.error("Error al iniciar sesión:", e);
    }
  }
  
  // Método auxiliar para manejar los mensajes de error
  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      "auth/invalid-credential": "Email inválido",
      "auth/email-already-in-use": "El email ya está en uso",
      "auth/invalid-email": "Formato de email inválido",
      // Otros errores específicos pueden añadirse aquí
    };
  
    return errorMessages[errorCode] || "No fue posible iniciar sesión. Intenta nuevamente.";
  }

  CloseSession(){
    signOut(this.auth).then(() => {
      this.usuarioService.clearUsuario();
      this.router.navigate(['/home']);
    //}).catch
    })
  } 

  AccesoRapidoAdmin() {
    this.userMail = "admin@gmail.com";
    this.userPWD = "123321";
  }
  AccesoRapidoEmpleado() {
    this.userMail = "empleado@gmail.com";
    this.userPWD = "123321";
  }
}