
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,AlertController,Platform } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
imagen:any='';
listaInformacion:any;
 
  constructor(
    private router: Router,
    public util: UtilService,
    private menuController:MenuController,
    private empresaService:EmpresaService
  ) { 

  }


  slideOpts = {
    slidesPerView: 1.1,
  };

  slideOptstwo = {
    slidesPerView: 2.1,
  };
ionViewWillEnter(){
  console.log("entro home")
 
  this.onExplore();
  
}
  ngOnInit() {
    this.menuController.enable(true);
    this.imagen="";
    
    
  }

  onProducts() {
    this.router.navigate(['products']);
  }

  onFavorite() {
    this.router.navigate(['favorites']);
  }

  onClick() {

  }

  async onExplore() {
    await this.empresaService.get_informacion().subscribe(res=>{
      this.listaInformacion=res['message'].datoList;       
      console.log(this.listaInformacion)
      this.imagen="data:image/png;base64,"+this.listaInformacion.logo;
    },error =>{

      console.error();
    this.util.errorToast("Error de conexión!")
    
    });

  }

}
