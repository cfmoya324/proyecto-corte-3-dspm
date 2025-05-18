import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_HEROES } from '../config/url.servicios';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  constructor(private http: HttpClient) { }


  getMultimedias():any {
    let url = `${URL_HEROES}/multimedias/`;
    
    return this.http.get(url).pipe(
      map((data) => {
        console.log('DATOS INICIALES MULTIMEDIAS', data);
        return data;
      })
    );
  }

  getGrupoMultimedias():any {
    let url = `${URL_HEROES}/grupomultimedias/`;
    
    return this.http.get(url).pipe(
      map((data) => {
        console.log('DATOS INICIALES GRUPO MULTIMEDIAS', data);
        return data;
      })
    );
  }

  getMultimediaDeHeroe(idHeroe: string):any {
    let url = `${URL_HEROES}/multimediasheroe/heroe/${idHeroe}`;
    
    return this.http.get(url).pipe(
      map((data) => {
        console.log('DATOS INICIALES MULTIMEDIAS DE HEROE', data);
        return data;
      })
    );
  }

}
