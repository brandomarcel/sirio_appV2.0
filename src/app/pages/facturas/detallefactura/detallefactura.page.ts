import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { LoadingController, ModalController,NavController } from '@ionic/angular';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.page.html',
  styleUrls: ['./detallefactura.page.scss'],
})
export class DetallefacturaPage implements OnInit {
  @Input() name:any;
  factura_name:any;
  estado:boolean=false;
  id:any;
  listaFactura:[];
  found:any;
  skull:any;
  contenido:any;
  constructor(
    private facturacionService:FacturacionService,
    private modalController: ModalController,
    private loadingController:LoadingController,
    private utilService:UtilService,
    private activatedRoute:ActivatedRoute,
    private navController:NavController) {

   }

  ngOnInit() {
    console.log("oniit")
   
    this.id = this.activatedRoute.snapshot.params['id']
    console.log(this.id)
    this.get_facturas(null,null,this.id)
  }
  get_facturas(desde, hasta,id) {
    var lstFacturas=null;
     this.facturacionService.get_facturas(desde, hasta).subscribe((data: any) => {
      lstFacturas = data.message.datoList;
      this.found = lstFacturas.find(element => element.name == id);
      console.log(this.found)

      this.get_detalle_factura(this.found.name)
    }, error => {
      console.error(error);
      this.utilService.errorToast("Error de conexión!")
    }

    )
  }
  get_detalle_factura(name){

    this.facturacionService.get_detalle_factura(name).subscribe(res=>{
      console.log(res['message'])
      this.listaFactura=res['message']
      this.skull=true;
      this.contenido=true;
    },error =>{
      this.utilService.errorToast("Error de conexión!")
    })
  }
  onBack() {
    this.navController.back();
  }

 async generarNota(){
    this.utilService.presentConfirm("Confirmación!","Seguro desea generar la nota de crédito?","No","Si").then(res => {
      console.log("respuesta",res)

      if (res=='ok') {
        this.facturacionService.crear_nota_credito(this.name.name).subscribe(res=>{
        console.log(res)

        if (res["message"].estado==true) {
          this.utilService.success_msg(res["message"].dato);
          
           this.onBack()
        
        
          
        }else{
          var error = (res["message"].mensajeError).substring(17,67);
          this.utilService.showErrorAlert(error)
        }

      })
 
      }
      
    })
     
    
  }
}
