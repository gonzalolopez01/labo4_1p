import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Usuario } from '../models/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public collection:any[] = [];
  private sub!:Subscription;

  private usuarioSubject = new BehaviorSubject<any | null>(null);

  constructor(private firestore: Firestore) { }

  TipoReg(user:string, tipo:string){
    let col = collection(this.firestore, 'usuarios');

    let obj = {"usuario": user, "tipo": tipo};

    addDoc(col, obj);
  }

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
/************************ */
  async AddUsuario(item: any): Promise<string | null> {
    try {      
      const itemRef = collection(this.firestore, 'usuarios');
            
      const docRef = await addDoc(itemRef, item );
      
      //console.log(`Turno guardado con ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('Error al guardar el horario:', error);
      return null;
    }
  }    
  async GetUserPorEmail(email: string): Promise<Usuario | null> {
    const col = collection(this.firestore, 'usuarios');
  
    const filteredQuery = query(
      col,
      where('email', '==', email)
    );
  
    try {
      const querySnapshot = await getDocs(filteredQuery);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as Usuario;
        return { ...userData, id: userDoc.id }; // Agregar el ID del documento al objeto Usuario
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      return null;
    }
  }
  async ModificarUsuario(userId: string, fieldsToUpdate: Partial<Usuario>): Promise<void> {
    const docRef = doc(this.firestore, 'usuarios', userId);
  
    try {
      await updateDoc(docRef, fieldsToUpdate);
      console.log(`Usuario con ID ${userId} actualizado correctamente.`);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error; 
    }
  }

  /***** */
  
  usuario$: Observable<any | null> = this.usuarioSubject.asObservable();
  usuarioLogeado:any;  
  setUsuario(usuario: any): void {
    this.usuarioSubject.next(usuario);
    if(usuario != null){
      this.sub = this.usuario$.subscribe((data:any) =>{
        this.usuarioLogeado = data;
      }
    )}
  }

  getUsuarioActual(): any | null {
    return this.usuarioSubject.getValue();
  }

  clearUsuario(): void {
    this.usuarioSubject.next(null);
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
      console.log('login service se destruyo');
    }
  }
}
