import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubService } from '../../services/hithub.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user = 'gonzalolopez01';
  imagen = '';
  nombre = '';
  subscription!: Subscription; 
  res: any;
  isUsuario = false;

  constructor(private githubService: GithubService ) {
    
  }

  ngOnInit(): void {

    this.subscription = this.githubService.GetPerfil(this.user)
    .subscribe(res => {      
      this.res = res;    
      this.imagen = this.res.avatar_url;
      this.nombre = this.res.name;
      this.isUsuario = true;      
    }); 

  }

  enviar(){
    console.log(this.user);
    this.subscription = this.githubService.GetPerfil(this.user)
    .subscribe(res => {      
      this.res = res;    
      this.imagen = this.res.avatar_url;
      this.nombre = this.res.name;
      this.isUsuario = true;      
    }); 
  }

}
