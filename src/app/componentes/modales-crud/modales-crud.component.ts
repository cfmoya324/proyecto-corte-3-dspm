import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonModal, IonContent, IonActionSheet, IonInput, IonHeader, IonToolbar, IonButtons, IonTitle, IonList, IonTextarea, ToastController, AlertController} from '@ionic/angular/standalone';
import { borrarApi, editarApi } from 'src/app/interfaces/heroes.interface';
import { HeroesService } from 'src/app/servicios/heroes.service';

@Component({
  selector: 'app-modales-crud',
  templateUrl: './modales-crud.component.html',
  styleUrls: ['./modales-crud.component.scss'],
  imports: [IonItem, IonLabel, IonButton, IonModal, IonContent, IonActionSheet, IonInput, IonHeader, IonToolbar, IonButtons, IonTitle, IonList, IonTextarea],
})
export class ModalesCrudComponent  implements OnInit {

  @Input() biografia:string = '';
  @Input() id:string = '';
  @Input() nombre:string = '';
  @Input() casa:string = '';
  @Input() icono:string = '';
  @Input() aparicion:string = '';
  @Output() eventReloadAPI = new EventEmitter<string>();

  respuestaApiEditar:editarApi = {Ok:false, msg:'', resp: {message: ''}};
  respuestaApiBorrar:borrarApi = {Ok:false, msg:'', resp: {message: ''}};

  @ViewChild("modalEdit") modalEdit!: IonModal;

  public actionSheetButtons = [
    {
      text: 'Eliminar personaje',
      role: 'destructive',
      icon: 'trash',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.borrarHeroe();
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    },
  ];

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

  async borrarHeroe() {
    console.log('Borrado confirmado')

    let load = {
      _id: this.id,
      bio: '',
      nombre: '',
      casa: '',
      img: '',
      aparicion: ''
    }

    await this.bd.crudHeroes(load, 'eliminar').toPromise().then(
      (data: borrarApi) => {
        this.respuestaApiBorrar = data;
        console.log("Respuesta borrado: ", this.respuestaApiBorrar);
      }
    );

    if (this.respuestaApiBorrar.Ok) {
      this.eventReloadAPI.emit('borrado');
      this.presentToast('Borrado de personaje exitoso.')
    }
    else {
      this.presentAlert(this.respuestaApiBorrar.resp?.message || 'Borrado de personaje fallido.')
    }
  }

  async onWillDismissModalEditar(event: any) {
    if (event.detail.role === 'confirm') {
      console.log('modal de edición confirmado')

      let load = {
        _id: this.id,
        bio: this.biografia,
        nombre: this.nombre,
        casa: this.casa,
        img: this.icono,
        aparicion: this.aparicion
      }

      await this.bd.crudHeroes(load, 'modificar').toPromise().then(
        (data: editarApi) => {
          this.respuestaApiEditar = data;
          console.log("Respuesta edición: ", this.respuestaApiEditar);
        }
      );

      if (this.respuestaApiEditar.Ok) {
        this.eventReloadAPI.emit('edicion');
        this.presentToast('Edición de personaje exitosa.')
      }
      else {
        this.presentAlert(this.respuestaApiEditar.resp?.message || 'Edición de personaje fallida.')
      }
    }
  }

  cancelModalEditar() {
    this.modalEdit.dismiss(null, 'cancel');
  }

  confirmModalEditar() {
    if (this.biografia !== '' && this.nombre !== '' && 
        this.casa !== '' && this.icono !== '' &&
        this.aparicion !== '' ) {

      this.modalEdit.dismiss(null, 'confirm');
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
