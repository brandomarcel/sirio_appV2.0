
import { ProductosService } from './../../../services/productos.service';
import { IonSearchbar, LoadingController, ModalController} from '@ionic/angular';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NuevoProductoPage } from '../nuevo-producto/nuevo-producto.page';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.page.html',
  styleUrls: ['./gestion-productos.page.scss'],
})

export class GestionProductosPage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;
  filterTerm: string;
  listaProductos: any;
  thingy: any = {};
  cont:boolean;
  compania:any;
  token:any;
  abbr:any;
  public redirectTo: string;
  constructor(public utilService: UtilService,
    private productosService: ProductosService,
    private modalController: ModalController,
    private loadingController: LoadingController) {


  }
  ngOnInit() {
    console.log("ngOnInit")
   

  }
   ionViewWillEnter() {
    console.log("ionViewWillEnter")   
    this.cargarDatos();
    
  }

  async cargarDatos(){
    this.compania = await this.utilService.getStorage("compania")
    
    this.token = await this.utilService.getStorage("token")
  
    this.abbr = await this.utilService.getStorage("abbr")
    
    this.listar_productos(  this.compania,  this.abbr,  this.token)
  }
   listar_productos(compania,abbr,token) {
    console.log("entro listar")
    this.listaProductos = null;
     this.productosService.listar_productos(compania,abbr,token).subscribe((res: any) => {
      this.listaProductos = res['message'].datoList;

      console.log(this.listaProductos)
    }, error => {
      this.utilService.showErrorAlert("Error de conexion!")
      console.error(error)
    })
  }



  async editAddCliente(item) {
    const modal = await this.modalController.create({
      component: NuevoProductoPage,
      cssClass: 'custom_modal',
      mode: 'ios',
      backdropDismiss: true,
      componentProps: {
        nuevo: item,
       
      }
    });

    modal.onDidDismiss().then((dataDevuelta) => {

      console.log(dataDevuelta.data)
      if (dataDevuelta.data) {
        this.listar_productos(this.compania,  this.abbr,  this.token);
      }
    });
    return await modal.present();

  }

  async eliminar_producto(id) {
    this.utilService.presentConfirm("Confirmar!", "Seguro desea eliminar el producto?", 'Cancelar', 'OK').then(res => {
      console.log("respuesta", res)
      if (res === 'ok') {
        this.eliminarProducto(id);
      }
    });

  }

  async eliminarProducto(id) {
    const loading = await this.loadingController.create({ message: "Eliminando..." });
    loading.present();
    this.productosService.eliminar_producto({ 'producto_id': id }).subscribe(res => {
      if (res["message"].estado == true) {
        loading.dismiss();
        this.utilService.success_msg(res["message"].dato);
        this.listar_productos(this.compania,  this.abbr,  this.token);
      } else {
        loading.dismiss();
        this.utilService.showErrorAlert(' Error en eliminación del producto por que tiene facturas vinculadas')
      }

    }, error => {
      console.error(error)
      this.utilService.errorToast("Error de conexion!")
    })
  }

}
