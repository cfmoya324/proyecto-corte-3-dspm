import { Component, Input, OnInit } from '@angular/core';
import { IonItem, IonAvatar, IonLabel, IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonItemOptions, IonItemOption, IonItemSliding} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, pencil, personAdd, personRemove, trash } from 'ionicons/icons';
import { ModalesCrudComponent } from '../modales-crud/modales-crud.component';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
  imports: [ModalesCrudComponent, IonItem, IonAvatar, IonLabel, IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonItemOptions, IonItemOption, IonItemSliding],
})
export class HeroeComponent  implements OnInit {

  @Input() id:string = '';
  @Input() icono:string = '';
  @Input() nombre:string = '';
  @Input() casa:string = '';
  @Input() aparicion:string = '';
  @Input() biografia:string = '';

  constructor() {
    addIcons({ create, pencil, personAdd, personRemove, trash });
  }

  ngOnInit() {}

}
