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

  loggedUser = "";
  cargado = true;
  msjError = "";

  constructor(private router: Router, public auth: Auth, private loginService: LoginService){ } 

  Login() {
    signInWithEmailAndPassword(this.auth, this.userMail, this.userPWD).then((res) => {
            
      if (res.user.email !== null) this.loggedUser = res.user.email;
      
      this.loginService.GetTipo(this.userMail);


      //this.loginsReg.GetDataReg();
      // this.router.navigate(['../']);
      //this.router.navigate(['/home']);
      
    }).catch((e) => {//aca tambien se resolvió la promesa      

      switch (e.code) {
        case "auth/invalid-credential":
          this.msjError = "Email invalido";
          //this.toastCredenciales();
          break;
        case "auth/email-already-in-use":
          
          break;
        case "auth/invalid-email":
          //this.toastEmail();
          break;
        default:
          //this.toastDefault();
          //en vez de e.code poner algo asi como que no fue posible registrarse, como generico
          //this.msjError = e.code
          break;          
      }
    });
  }
  CloseSession(){
    signOut(this.auth).then(() => {
      //console.log(this.auth.currentUser?.email)
      //aca podemos hacer el ruteo al login porque se cerro la sesion
      //console.log("logout con exito");

      //this.router.navigate(['../']);
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