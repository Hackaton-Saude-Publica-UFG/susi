import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
  ) { }

  async presentGenericToast(opt: { message: string, position?: 'top' | 'middle' | 'bottom', timeout?: number }) {
    const toast = await this.toastCtrl.create({
      message: opt.message,
      duration: opt.timeout || 10000,
      showCloseButton: true,
      closeButtonText: '✕',
      keyboardClose: true,
      position: opt.position ? opt.position : 'top',
    })
    await toast.present();
    return toast;
  }

  // tslint:disable-next-line:max-line-length
  async presentGenericLoading(opt?: { message?: string, duration?: number, spinner?: "lines" | "lines-small" | "bubbles" | "circles" | "crescent" | "dots", translucent?: boolean }) {
    const loading = await this.loadingCtrl.create({
      spinner: opt && opt.spinner ? opt.spinner : 'bubbles',
      duration: opt && opt.duration ? opt.duration : undefined,
      message: opt && opt.message ? opt.message : 'Loading...',
      translucent: opt && opt.translucent ? opt.translucent : true,
      keyboardClose: true,
      cssClass: 'spinner-tertiary',
    });
    await loading.present();
    return loading;
  }

  async presentGenericAlert(opt: Alert) {
    const alert = await this.alertCtrl.create({
      header: opt.header,
      subHeader: opt.subHeader,
      message: opt.message || '',
      buttons: opt.buttons ? opt.buttons : [{
        text: 'Ok',
        role: 'close'
      } as AlertButton],
      inputs: opt.inputs,
      keyboardClose: true,
      backdropDismiss: false,
    });
    await alert.present();
    return alert;
  }

  async presentGenericActionSheet(opt: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: opt.header,
      buttons: opt.buttons || [{
        text: 'cancelar',
        icon: 'close',
        role: 'close',
        cssClass: 'color-danger'
      }],
      keyboardClose: true,
    });
    await actionSheet.present();
    return actionSheet;
  }

}

export interface Alert {
  header?: string;
  subHeader?: string;
  message?: string;
  inputs?: any[];
  buttons?: AlertButton[];
}

export interface AlertButton {
  text: string;
  role?: string;
  cssClass?: string;
  handler?: (params?: any[]) => void;
}