import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  name:string;
  constructor(private alertController: AlertController,
    public utilService:UtilService,
    private platform: Platform,
    private router: Router,
    private location: Location) {
    this.backButtonEvent();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent();

    });
  }

  async cargarDatos(){
    
    console.log("cargarDatos")
this.name= await this.utilService.getStorage("compania");
   
  }

  home() {
    this.router.navigate(['tabs/home']);
  }
  clientes() {
    this.router.navigate(['tabs/clientes']);
  }
  productos() {
    this.router.navigate(['tabs/productos']);
  }
 
  facturas() {
    this.router.navigate(['tabs/facturas']);
  }
  notasCredito() {
    this.router.navigate(['tabs/gestioncreditos']);
  }
  notifications() {
   // this.router.navigate(['']);
  }
  inbox() {
   // this.router.navigate(['']);
  }
  about() {
   // this.router.navigate(['']);
  }
  cerrarApp(){
    this.utilService.closeSideMenu();

    /* const platform = Capacitor.getPlatform();
    if (platform === "web") {
      this.logout();
    }else{
      this.utilService.presentConfirm("Confirmar!","Desea cerrar la aplicación?","No","Si").then(res=>{
        console.log(res)
        if (res == 'ok') {
          this.utilService.removeStorage("user");
          this.utilService.removeStorage("compania");
          this.utilService.removeStorage("token");
          this.utilService.removeStorage("abbr");
          navigator['app'].exitApp();
        }
      });
    }       */
  }

  backButtonEvent() {
    console.log('Entro back button');
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        console.log('canGoBack');
        this.backButtonAlert();
      } else {
        console.log('location');
        this.location.back();
      }
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: 'You pressed the back button',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Close App',
        handler: () => {
          App.exitApp();
        }
      }
      ]
    });
    await alert.present();
  }
}
