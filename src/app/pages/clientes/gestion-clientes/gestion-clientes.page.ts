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
    this.listar_cliente()
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
       
          this.listar_cliente()
      
        }
      });
       return await modal.present();
  
    }

  async listar_cliente() {

    this.clientesService.listar_cliente().subscribe(res => {
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

        this.listar_cliente();

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
