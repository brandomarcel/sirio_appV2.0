import { NuevoClientePage } from './../nuevo-cliente/nuevo-cliente.page';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, LoadingController} from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';
import { UtilService } from 'src/app/services/util.service';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.page.html',
  styleUrls: ['./gestion-clientes.page.scss'],
})
export class GestionClientesPage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;
  filterTerm: string;
  listaClientes: any;
  compania:any;
  token:any;
  abbr:any;
  constructor(
    public utilService: UtilService,
    private clientesService: ClientesService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {

  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.cargarDatos();
  }


    async editAddCliente(item) {
      console.log(item)
      const modal = await this.modalController.create({
        component: NuevoClientePage,
        cssClass: 'custom_modal',
        mode:'ios',
        componentProps: {
          nuevo: item,
        }
      });
  
      modal.onDidDismiss().then((dataDevuelta) => {
        console.log("asdfa")
        console.log(dataDevuelta.data)
        if (dataDevuelta.data) {
          console.log("entro ala")
       
          this.listar_cliente(this.compania, this.token)
      
        }
      });
       return await modal.present();
  
    }
    async cargarDatos(){
      this.compania = await this.utilService.getStorage("compania")
      
      this.token = await this.utilService.getStorage("token")
   
      
      this.listar_cliente(this.compania,this.token)
    }
  async listar_cliente(compania,token) {
    this.listaClientes = null;
    this.clientesService.listar_cliente(compania,token).subscribe(res => {
      console.log(res)
      this.listaClientes = res['message'].datoList;
      console.log(this.listaClientes)
    }, error => {
      this.utilService.showWarningAlert("Error de conexion!")
      console.error(error)
    })
  }

  async eliminar_cliente(id) {

    this.utilService.presentConfirm("Confirmar!", "Seguro desea eliminar el cliente?", 'Cancelar', 'OK').then(res => {
      console.log("respuesta", res)
      if (res === 'ok') {
        this.eliminarCliente(id);

      }
    });

  }


  async eliminarCliente(id) {

    const loading = await this.loadingController.create({ message: "Eliminando..." });
    loading.present();
    this.clientesService.eliminar_cliente({ 'cliente': id }).subscribe(res => {
      console.log(res);

      if (res["message"].estado == true) {
        loading.dismiss();
        this.utilService.success_msg(res["message"].dato);

        this.listar_cliente(this.compania, this.token);

      } else {
        loading.dismiss();
        var error = (res["message"].dato)
        this.utilService.showErrorAlert(error)
      }

    }, error => {
      console.error(error)
      this.utilService.errorToast("Error de conexion!")
    })
  }


}
