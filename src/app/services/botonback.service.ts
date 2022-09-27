import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class BotonbackService {

  constructor(private platform:Platform,
    private alertController:AlertController,
    private utilService:UtilService) { 
    
  }


  init(){
    console.log('entro al boton y llego al init');
   
   this.showExitConfirm();
  }

  showExitConfirm() {
    this.utilService.presentConfirm("Confirmar!","Desea cerrar la aplicación?","No","Si").then(res=>{
      console.log(res)
      if (res == 'ok') {

        
        this.utilService.removeStorage("user");
        this.utilService.removeStorage("compania");
        this.utilService.removeStorage("token");
        this.utilService.removeStorage("abbr");
        navigator['app'].exitApp();

      }
    })
  }
}
