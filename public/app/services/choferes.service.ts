import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoferesService {
  private itemsSubject = new BehaviorSubject<Object[]>([]);
  public items: Observable<Object[]> = this.itemsSubject.asObservable();//con este emito, aca me suscribo
  private subItems!:Subscription;

  constructor(private firestore:Firestore) { 
    this.GetItems();//traigo todo y lo mantengo actualizado - 1
  }

  GuardarChofer(repartidor: Object){
    const col = collection(this.firestore, 'choferes');
        
    const obj = { repartidor };
    
    return from(addDoc(col, obj));
  }

  GetItems(){//2
    let col = collection(this.firestore, 'choferes');
    
    const observable = collectionData(col);//obtengo la coleccion entera

    this.subItems = observable.subscribe((respuesta:Object[])=>{
      this.itemsSubject.next(respuesta);//emite actualizacion
    })
  }


}
