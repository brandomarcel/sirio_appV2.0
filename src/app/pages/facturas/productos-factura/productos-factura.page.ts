import { UtilService } from 'src/app/services/util.service';
import { ProductosService } from './../../../services/productos.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-productos-factura',
  templateUrl: './productos-factura.page.html',
  styleUrls: ['./productos-factura.page.scss'],
})
export class ProductosFacturaPage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;
  filterTerm: string;
  current: any = 1;
  listaProductos: any;
  control: boolean;
  val: any;
  compania:any;
  token:any;
  abbr:any;
  constructor(private navCtrl: NavController,
    private modalController: ModalController,
    private productosService: ProductosService,
    private utilService:UtilService) { }

  ngOnInit() {

    console.log("init")
    this.val = "";
   
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter")   
   this.cargarDatos();
  }
  
  async cargarDatos(){
    this.compania = await this.utilService.getStorage("compania")
    console.log(  this.compania);
    this.token = await this.utilService.getStorage("token")
    console.log(  this.token);
    this.abbr = await this.utilService.getStorage("abbr")
    console.log(  this.abbr);
    this.listar_productos(  this.compania,  this.abbr,  this.token)
  }

  async listar_productos(compania,abbr,token) {
    this.productosService.listar_productos(compania,abbr,token).subscribe(res => {
      
      this.listaProductos = res['message'].datoList;
      for (let i = 0; i < res['message'].datoList.length; i++) {
        const element = this.listaProductos[i]

        element.num = 1;
        element.total = this.listaProductos[i].pvp;

      }
    }, error => {
      this.utilService.showErrorAlert("Error de conexion!")
      console.error(error)
    })
  }

  mas(valor: any, i: any) {
    this.listaProductos[i].num += 1;
    /* 
    const total =(this.listaProductos[i].pvp * this.listaProductos[i].num);
    this.listaProductos[i].total = Number(total.toFixed(2));
 */


  }
  menos(valor: any, i: any) {
    if (this.listaProductos[i].num <= 1) {
      console.log("no pude cer 0")

    } else {
      this.listaProductos[i].num -= 1;
      /*    const total =(this.listaProductos[i].pvp * this.listaProductos[i].num);
       this.listaProductos[i].total = total.toFixed(2) */
    }
  }


  onBack() {
    this.modalController.dismiss();
  }

  pvp(event) {
    this.val = event.detail.value;
  }


  async atrasEditar(data) {

    console.log(this.val)
    if (this.val  && (this.val > 0)) {
      data.pvp = Number(this.val);
      data.total = Number(data.pvp * data.num);
      await this.modalController.dismiss(data);
    } else {
      await this.modalController.dismiss(data);
    }
  }

}
