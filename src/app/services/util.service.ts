/*
  Authors : bunchdevelopers (Rahul Jograna)
  Website : https://bunchdevelopers.com/
  App Name : ionic6Template Pack
  This App Template Source code is licensed as per the
  terms found in the Website https://bunchdevelopers.com/license
  Copyright and Good Faith Purchasers © 2021-present bunchdevelopers.
*/
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Router,NavigationEnd  } from '@angular/router';
import Swal from 'sweetalert2';

import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  loader: any;
  isLoading = false;

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public router: Router,
    private navCtrl: NavController,
    private menuController: MenuController
  ) {

    
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
        }
    });
  }

  openSideMenu() {
    
    this.menuController.open();
  }
  closeSideMenu() {
    
    this.menuController.close();
  }
  /*
  Start Loader
  Call this method to Start your Loader
  */
  async show() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      spinner: 'dots',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  success_msg(title) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }
  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  /*
    Show Warning Alert Message
    param : msg = message to display
    Call this method to show Warning Alert,
    */
  async showWarningAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: msg,
      buttons: ['ok']
    });
    await alert.present();
  }
  async showSimpleAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: msg,
      buttons: ['ok']
    });
    await alert.present();
  }
  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
  async showErrorAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: msg,
      buttons: ['ok']
    });
    await alert.present();
  }
  /*
     param : email = email to verify
     Call this method to get verify email
     */
  async getEmailFilter(email) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      const alert = await this.alertCtrl.create({
        header: 'warning',
        message: 'Please enter valid email',
        buttons: ['ok']
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }
  /*
    Show Toast Message on Screen
     param : msg = message to display, color= background
      color of toast example dark,danger,light. position  = position of message example top,bottom
     Call this method to show toast message
     */
  async showToast(msg, color, positon) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: positon
    });
    toast.present();
  }
  async errorToast(msg, color?, posicion?) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? 'dark' : 'danger' ,
      position:posicion?'bottom' : 'top' 
    });
    toast.present();
  }
  apiErrorHandler(err) {
    console.log('error', err);
  }

  setStorage(key: string, value: any){
    Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }
   async getStorage(key: string){
    const item = await Preferences.get({ key: key });
    //console.log("getStorage:",item.value)
   return  JSON.parse(item.value);
  }

  async removeStorage(key: string){
    await Preferences.remove({
      key: key,
    });
  }

  async presentConfirm(header: any,message: any,cancelText: any,okText: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: header,
        message: message,
        mode: 'ios',
        cssClass: 'dlgconfirmar',
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: okText,
            cssClass: 'dlgprimary',
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }


  

  validadorDeCedula(cedula: string) {
    // Autor: jefferk

    let ced = String(cedula).substring(0,10);
    console.log(String(cedula).substring(0,10))
    if (ced.length == 10 || ced.length == 13) {
      let tercerDigito = parseInt(ced.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(ced.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (ced.length - 1); i++) {
          digito = parseInt(ced.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
        }
        suma = Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          // cedulaCorrecta = true;
          return true;
        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          //  cedulaCorrecta = true;
          return true;

        } else {
          // cedulaCorrecta = false;
          return false;

        }
      } else {
        // cedulaCorrecta = false;
        return true;

      }
    } else {
      // cedulaCorrecta = false;
      return false;

    }




  }


  public getPreviousUrl() {
    return this.previousUrl;
}
public getCurrentUrl() {
    return this.currentUrl;
}

}
