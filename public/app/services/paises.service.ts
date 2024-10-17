import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(public http: HttpClient) { } 

  GetPaises(){
    return this.http.get<any[]>(
      `https://restcountries.com/v3.1/all`
    );
  }

  GetPaisesRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://restcountries.com/v3.1/region/${region}?fields=name,flags,translations`
    );
  }
  
  GetPaisesDeEuropaYAfrica(): Observable<any[]> {
    const europa$ = this.GetPaisesRegion('Europe');
    const africa$ = this.GetPaisesRegion('Americas');
  
    return forkJoin([europa$, africa$]).pipe(
      map(([europa, america]) => {
        
        const paises = [...europa, ...america];
        //return paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
        return paises.sort((a, b) => a.translations.spa.common.localeCompare(b.translations.spa.common));

        // return paises.sort((a, b) => {
        //   const traduccionA = a.translations.spa?.common || a.name.common;
        //   const traduccionB = b.translations.spa?.common || b.name.common;
        //   return traduccionA.localeCompare(traduccionB);
        
      })
    );
  }
  
  GetDetallePais(nombrePais: string): Observable<any> {//devulevo observable
    return this.GetPaises().pipe(
      map((paises: any[]) => {
        const paisEncontrado = paises.find((pais: any) => 
          pais.translations.spa.common.toLowerCase() === nombrePais.toLowerCase()
        );
        
        if (paisEncontrado){
          return{
            nombre: paisEncontrado.translations.spa.common,
            bandera: paisEncontrado.flags.png
          };
        }else{
          return null;
        }
      })
    );
  }
}
