import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(public http: HttpClient) { }

  GetPerfil(user: string){
    return this.http.get<any[]>('https://api.github.com/users/'+user+'');    
  }  
}
