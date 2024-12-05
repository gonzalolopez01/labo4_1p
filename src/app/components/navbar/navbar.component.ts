import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(public auth:Auth, private router: Router){}

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
}
