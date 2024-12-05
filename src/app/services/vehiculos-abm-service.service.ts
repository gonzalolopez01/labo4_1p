import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Vehiculo } from '../models/interfaces/vehiculo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosAbmServiceService {

  constructor(private firestore:Firestore) { }

  AddVehiculo(vehiculo: Vehiculo){
    //referencia contra la base de datos. usamos metodo collection, a treves de esto accedemos a las collection de FB
    const vehiculoRef = collection(this.firestore, 'vehiculos');
    
    return addDoc(vehiculoRef, vehiculo);//agrego el item. Le paso la referencia a la collection y el item que le quiero agregar. Retorna una ref del item agregado
  }

  GetVehiculos(): Observable<Vehiculo[]>{//obtengo los vehiculos con el ID
    //referecnia a la coleccion
    const vehiculoRef = collection(this.firestore, 'vehiculos');
    //trae los datos de la coleccion. Que traiga segun el campo id
    //retorna promesa pero queremos el dato actualizado todo el tiempo, lo casteamos a observable
    return collectionData(vehiculoRef, {idField: 'id'}) as Observable<Vehiculo[]>;  
  }
  DeleteVehiculo(vehiculo: Vehiculo){
    const vehiculoRef = doc(this.firestore, `vehiculos/${vehiculo.id}`);//traigo la red del item por su Id
    return deleteDoc(vehiculoRef);
  }

  //**************************************/

  ObtenerVehiculosConEstadoTrue(): Observable<Vehiculo[]>{    
    let vehiculosRef = collection(this.firestore, 'vehiculos');
    const filteredQuery = query(
      vehiculosRef,      
      where('estado', '==', true)       
    );

    return collectionData(filteredQuery, {idField: 'id'}) as Observable<Vehiculo[]>;  
  }
  ModificarItem(id:string, vehiculo: Vehiculo){
    const vehiculoRef = doc(this.firestore, 'vehiculos', id);
    return updateDoc(vehiculoRef, {...vehiculo});
    // return updateDoc(vehiculoRef, {
    //   vehiculo:vehiculo.id,
    //   nombre:vehiculo.nombre,
    //   tipo:vehiculo.tipo, 
    //   ruedas:vehiculo.ruedas, 
    //   capacidad:vehiculo.capacidad, 
    //   estado:vehiculo.estado
    // });
  }
  //considerar este, implemetar cambios en la implentacion de este metodo
  // async ModificarItem(id: string, vehiculo: Vehiculo) {
  //   try {
  //     const vehiculoRef = doc(this.firestore, 'vehiculos', id);
  //     await updateDoc(vehiculoRef, { ...vehiculo });
  //     console.log(`Vehiculo with ID ${id} has been updated successfully.`);
  //   } catch (error) {
  //     console.error('Error updating vehiculo:', error);
  //     // You can handle the error here or rethrow it if necessary
  //   }
  // }

  BajaItem(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'vehiculos', id); // Obtengo la referencia al elemento
  
    return getDoc(docRef)
      .then((documentSnapshot) => {//en el the se resolvio la promise y manipulo la resputesta
        if (documentSnapshot.exists()) {
          const currentData = documentSnapshot.data();          
  
          // Si el atributo 'estado' existe, lo cambio a false
          if (currentData && currentData['estado'] !== undefined) {
            return updateDoc(docRef, { estado: false });
          } else {
            return Promise.reject(new Error("El atributo 'estado' no existe en el documento."));
          }
        } else {
          return Promise.reject(new Error("El documento no existe."));
        }
      })
      .then(() => {
        console.log("Estado actualizado a false.");
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del documento:", error);
        throw error; // Re-lanzar el error para manejarlo externamente si es necesario
      });
  }
  
  
  
  
  
  
  //Forma 2
  // async BajaItem(id: string): Promise<void> {
  //   const docRef = doc(this.firestore, 'helados', id); // Obtengo la referencia al elemento
  
  //   try {
  //     // Obtengo el documento
  //     const documentSnapshot = await getDoc(docRef);
  
  //     if (documentSnapshot.exists()) {
  //       const currentData = documentSnapshot.data();
  
  //       // Si el atributo 'estado' existe, lo cambio a false
  //       if (currentData && currentData['estado'] !== undefined) {
  //         await updateDoc(docRef, { estado: false }); // Efectivizo el cambio en la colección
  //         console.log("Estado actualizado a false.");
  //       } else {
  //         throw new Error("El atributo 'estado' no existe en el documento.");
  //       }
  //     } else {
  //       throw new Error("El documento no existe.");
  //     }
  //   } catch (error) {
  //     console.error("Error al actualizar el estado del documento:", error);
  //     throw error; // Re-lanzar el error para que pueda ser manejado en la llamada
  //   }
  // }

}
