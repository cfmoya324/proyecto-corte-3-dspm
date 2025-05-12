import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_HEROES } from '../config/url.servicios';
import { map } from 'rxjs';
import { heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }


  getHeroes():any {
    return this.http.get(URL_HEROES).pipe(
      map((data) => {
        console.log('DATOS', data);
        return data;
      })
    );
  }


  getOneHeroe(id:string):any {
    let url = `${URL_HEROES}${id}`;

    return this.http.get(url, {}).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }


  crudHeroes(unHeroe: heroe, unaAccion: 'eliminar' | 'insertar' | 'modificar'):any {

    if (unaAccion === 'eliminar') {

      let url = `${URL_HEROES}${unHeroe._id}`;
      return this.http.delete(url).pipe(
        map((data) => {
          console.log(data);
          return data;
        })
      );
    }

    if (unaAccion === 'insertar') {

      const body = {
        nombre:unHeroe.nombre,
        bio:unHeroe.bio,
        img:unHeroe.img,
        aparicion:unHeroe.aparicion,
        casa:unHeroe.casa,
      };

      return this.http.post(URL_HEROES, body).pipe(
        map((data) => {
          console.log('DATOS', data);
          return data;
        }));
    }

    if (unaAccion === 'modificar') {
      let url = `${URL_HEROES}${unHeroe._id}`;

      const body = {
        nombre:unHeroe.nombre,
        bio:unHeroe.bio,
        img:unHeroe.img,
        aparicion:unHeroe.aparicion,
        casa:unHeroe.casa,
      };

      //console.log(parametros); #TODO
      return this.http.put(url, body).pipe(
        map((data) => {
          console.log(data);
          return data;
        }));
    }
  }

}
