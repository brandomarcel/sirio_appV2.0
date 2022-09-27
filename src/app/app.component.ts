import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, LoadingController, Platform, NavController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { AuthService } from './services/auth.service';

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
    private location: Location,
    private authService:AuthService,
    private loadingController:LoadingController,
    private navController:NavController) {
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
console.log(this.name)
   
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
  logout() {
    this.utilService.closeSideMenu();
    this.utilService.presentConfirm("Confirmar!","Desea cerrar la sesión","No","Si").then(res=>{
      console.log(res)
      if (res == 'ok') {
       this.cerrandoSessionLoading();
      }
    });
 
  }
  cerrarApp(){
    this.utilService.closeSideMenu();

    const platform = Capacitor.getPlatform();
    if (platform === "web") {
      this.logout();
    }else{
  this.backButtonAlert();
    }      
  }

  async cerrandoSessionLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cerrando Sesión...',
      duration: 1500,
      spinner:'bubbles'
    
      
    });
    
    
     await loading.present();

    setTimeout(() => {
     // this.navController.navigateRoot('login');
     this.utilService.removeStorage("user");
     this.utilService.removeStorage("compania");
     this.utilService.removeStorage("token");
     this.utilService.removeStorage("abbr");
     this.navController.navigateRoot(['login']);
    }, 1500);
  }

  async cerrandoAppLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cerrando Aplicación...',
      duration: 1500,
      spinner:'bubbles'
    
      
    });
    
    
     await loading.present();

    setTimeout(() => {
     // this.navController.navigateRoot('login');
     App.exitApp();
    }, 1500);
  }

  backButtonEvent() {
    console.log('Entro back button');
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        console.log('router',this.router.url);
        if (this.router.url !='/tabs/home' && this.router.url !='/login' ) {
          this.router.navigateByUrl("/tabs/home");
        }else if(this.router.url =='/login'){
          App.exitApp();
        }else{
          this.backButtonAlert();
        }
        console.log('canGoBack');
        console.log('routerOutlet',this.routerOutlet.canGoBack());
       
      } else {
        console.log('location',this.location);
        this.location.back();
      }
    });
  }

  async backButtonAlert() {

    this.utilService.presentConfirm('Confirmación','Desea salir de la aplicación?','Cancelar','Salir').then(res=>{
      console.log("respuesta", res)
      if (res === 'ok') {
       this.cerrandoAppLoading();
      }
    });
    
  }
}
