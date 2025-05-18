import { Component, EventEmitter, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonSearchbar, IonTitle, IonContent, IonList, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { HeroeComponent } from '../heroe/heroe.component';
import { HeroesService } from 'src/app/servicios/heroes.service';
import { create, pencil, personAdd, personRemove } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalCrearHeroeComponent } from '../modal-crear-heroe/modal-crear-heroe.component';
import { grupo, grupoApi, heroe, heroesApi, multimedia, multimediaApi, multimediaHeroeApi } from 'src/app/interfaces/heroes.interface';
import { MultimediaService } from 'src/app/servicios/multimedia.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonSearchbar, IonTitle, IonContent, HeroeComponent, ModalCrearHeroeComponent, IonList, IonIcon, IonFab, IonFabButton]
})
export class Tab2Page {

  heroes:Array<heroe> = [];
  multimediaHeroe:any = {};
  //imagenes: Array<multimedia> = [];
  //grupos: Array<grupo> = [];

  async cargarHeroes() {
    this.heroes = [];
    this.multimediaHeroe = {};

    await this.bdHeroes.getHeroes().toPromise().then((data: heroesApi) => {

      for (const element of data.resp) {
        this.heroes.push(element);

        this.multimediaHeroe[element._id] = []
        this.cargarMultimediaDeHeroe(element._id);
      }
      console.log("Mis personajes: ", this.heroes);
      console.log("Mis imagenes del heroe: ", this.multimediaHeroe);
    });
  }

  //async cargarMultimedias() {
  //  await this.bdMultimedia.getMultimedias().toPromise().then((data: multimediaApi) => {

  //    for (const element of data.resp) {
  //      this.imagenes.push(element);
  //    }
  //    console.log("Mis imagenes: ", this.imagenes);
  //  });
  //}

  //async cargarGruposMultimedias() {
  //  await this.bdMultimedia.getGrupoMultimedias().toPromise().then((data: grupoApi) => {

  //    for (const element of data.resp) {
  //      this.grupos.push(element);
  //    }
  //    console.log("Mis grupos: ", this.grupos);
  //  });
  //}

  async cargarMultimediaDeHeroe(idHeroe: string) {
    try {
      await this.bdMultimedia.getMultimediaDeHeroe(idHeroe).toPromise().then((data: any) => {
        if (data.Ok) {
          for (const element of data.resp) {
            this.multimediaHeroe[idHeroe].push(element.IdMultimedia.url);
          }
        }
        else {
          this.multimediaHeroe[idHeroe] = [];
        }
      });
    } catch (error) {
      console.error(`Error: en multimedia para heroe ${idHeroe}.`)
      this.multimediaHeroe[idHeroe] = [];
    }
  }

  recargarHeroes(event: any) {
    this.cargarHeroes();
  }

  constructor(private bdHeroes:HeroesService, private bdMultimedia:MultimediaService) { 
    addIcons({ create, pencil, personAdd, personRemove });
  }

  ngOnInit() {
    this.cargarHeroes();
    //this.cargarMultimedias();
    //this.cargarGruposMultimedias();
  }

}
