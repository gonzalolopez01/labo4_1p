import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public collection:any[] = [];
  private sub!:Subscription;

  constructor(private firestore: Firestore) { }

  TipoReg(user:string, tipo:string){
    let col = collection(this.firestore, 'usuarios');

    let obj = {"usuario": user, "tipo": tipo};

    addDoc(col, obj);
  }

  // GetTipo(user: string){
  //   this.collection = [];
  //   let col = collection(this.firestore, 'usuarios');//instanciamos la col que queremos leer
        
  //   const filteredQuery = query(
  //     col,
  //     where('usuario','==', user)            
  //   );
    
  //   const observable = collectionData(filteredQuery);
        
  //   this.sub = observable.subscribe((respuesta:any) => {
  //     console.log(respuesta);    
  //     this.collection = respuesta; //Actualizamos nuestro array      
      
  //   })
  // }
  GetTipo(user: string): Promise<string | null> {
    const col = collection(this.firestore, 'usuarios'); 
  
    const filteredQuery = query(
      col,
      where('usuario', '==', user) 
    );
  
    return new Promise((resolve, reject) => {
      const observable = collectionData(filteredQuery);
  
      const sub = observable.subscribe({
        next: (respuesta: any[]) => {
          if (respuesta.length > 0) {
            resolve(respuesta[0].tipo); 
          } else {
            resolve(null);
          }
          sub.unsubscribe(); 
        },
        error: (error: any) => reject(error)
      });
    });
  }
}
