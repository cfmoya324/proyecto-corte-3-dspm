import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonItem, IonAvatar, IonLabel, IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonItemOptions, IonItemOption, IonItemSliding, IonCol, IonRow, IonGrid} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, pencil, personAdd, personRemove, trash } from 'ionicons/icons';
import { ModalesCrudComponent } from '../modales-crud/modales-crud.component';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
  imports: [ModalesCrudComponent, IonItem, IonAvatar, IonLabel, IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonItemOptions, IonItemOption, IonItemSliding, IonCol, IonRow, IonGrid],
})
export class HeroeComponent  implements OnInit {

  @Input() id:string = '';
  @Input() icono:string = '';
  @Input() nombre:string = '';
  @Input() casa:string = '';
  @Input() aparicion:string = '';
  @Input() biografia:string = '';
  @Input() imagenes:Array<string> = [];
  @Output() eventReloadAPI = new EventEmitter<string>();

  recargarHeroes(event:any) {
    this.eventReloadAPI.emit(event);
  }

  constructor() {
    addIcons({ create, pencil, personAdd, personRemove, trash });
  }

  ngOnInit() {}
}
