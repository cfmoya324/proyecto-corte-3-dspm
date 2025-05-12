import { Component, EventEmitter, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonSearchbar, IonTitle, IonContent, IonList, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { HeroeComponent } from '../heroe/heroe.component';
import { HeroesService } from 'src/app/servicios/heroes.service';
import { create, pencil, personAdd, personRemove } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalCrearHeroeComponent } from '../modal-crear-heroe/modal-crear-heroe.component';
import { heroe, heroesApi } from 'src/app/interfaces/heroes.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonSearchbar, IonTitle, IonContent, HeroeComponent, ModalCrearHeroeComponent, IonList, IonIcon, IonFab, IonFabButton]
})
export class Tab2Page {

  heroes: Array<heroe> = [];
  @Output() heroeBorrado: EventEmitter<string>;

  async cargarHeroes() {
    await this.bd.getHeroes().toPromise().then((data: heroesApi) => {

      for (const element of data.resp) {
        this.heroes.push(element);
      }
      console.log("Mis personajes: ", this.heroes);
    });
  }

  recargarHeroes(x: any) {

  }

  constructor(private bd:HeroesService) { 
    addIcons({ create, pencil, personAdd, personRemove });
    this.heroeBorrado = new EventEmitter();
    this.cargarHeroes();
  }

}
