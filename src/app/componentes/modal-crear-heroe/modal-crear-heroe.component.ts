import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonItem, IonButton, IonModal, IonInput, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonList, IonTextarea, ToastController, AlertController} from '@ionic/angular/standalone';
import { heroesApi, insertarApi } from 'src/app/interfaces/heroes.interface';
import { HeroesService } from 'src/app/servicios/heroes.service';

@Component({
  selector: 'app-modal-crear-heroe',
  templateUrl: './modal-crear-heroe.component.html',
  styleUrls: ['./modal-crear-heroe.component.scss'],
    imports: [IonItem, IonButton, IonModal, IonInput, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonList, IonTextarea],
})
export class ModalCrearHeroeComponent  implements OnInit {

  @ViewChild("modalCrear") modalAdd!: IonModal;
  biografia:string = '';
  nombre:string = '';
  casa:string = '';
  icono:string = '';
  aparicion:string = '';
  @Output() eventReloadAPI = new EventEmitter<string>();

  respuestaApiCrear:insertarApi = {Ok:false, msg:'', resp: {message: ''}};

  crearHeroe() {
    console.log('funciona')
  }

  onInputNombre(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.nombre = value.toString();
  }

  onInputBio(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';
    this.biografia = value.toString();
  }

  onInputCasa(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';
    this.casa = value.toString();
  }

  onInputIcono(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';
    this.icono = value.toString();
  }

  onInputAparicion(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';
    this.aparicion = value.toString();
  }

  async onWillDismissModalCrear(event: any) {
    if (event.detail.role === 'confirm') {
      console.log('modal de creación confirmado');

      let load = {
        _id: '',
        bio: this.biografia,
        nombre: this.nombre,
        casa: this.casa,
        img: this.icono,
        aparicion: this.aparicion
      }

      await this.bd.crudHeroes(load, 'insertar').toPromise().then(
        (data: insertarApi) => {
          this.respuestaApiCrear = data;
          console.log("Respuesta inserción: ", this.respuestaApiCrear);
        }
      );

      if (this.respuestaApiCrear.Ok) {
        this.eventReloadAPI.emit('crear');
        this.presentToast('Creación de personaje exitosa.')
      }
      else {
        this.presentAlert(this.respuestaApiCrear.resp?.message || 'Creación de personaje fallida.')
      }
    }
  }

  cancelModalCrear() {
    this.modalAdd.dismiss(null, 'cancel');
  }

  confirmModalCrear() {
    if (this.biografia !== '' && this.nombre !== '' && 
        this.casa !== '' && this.icono !== '' &&
        this.aparicion !== '' ) {

      this.modalAdd.dismiss(null, 'confirm');
    }
    else {
      this.presentToast('No se pueden dejar campos vacios.')
    }
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

  constructor(private bd:HeroesService, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {}

}
