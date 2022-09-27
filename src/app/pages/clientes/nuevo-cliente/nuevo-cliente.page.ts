import { Router, ActivatedRoute } from '@angular/router';
import { Component, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.page.html',
  styleUrls: ['./nuevo-cliente.page.scss'],
})
export class NuevoClientePage implements OnInit {
  @Input() nuevo: any = [];
  nuevoForm: FormGroup;
  isSubmitted = false;
  compania: any;
  anadirEditar: boolean;
  nuevoFormAux: any = [];
  controlCedula:any;
id:any;
skull:any;
contenido:any;

  constructor(private navController: NavController,
    public formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private utilService: UtilService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private router: Router) {
    this.utilService.getStorage("compania").then(res => {
      this.compania = res;
    })
  }

  async listar_cliente(){
    
    if (this.nuevo) {
      this.buscador()
    } 

 }
  async buscador(){
    console.log(this.nuevo)
    this.nuevoForm.patchValue(this.nuevo);
   this.skull=true;
   this.contenido=true;
   this.nuevoFormAux = this.nuevo;
      console.log(this.nuevoForm.value)
  }
  ngOnInit() {
   


    console.log(this.anadirEditar)
    this.nuevoForm = this.formBuilder.group({
      compania: [''],
      tipo_identificacion: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.minLength(2)]],
      nombre_completo: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
      ciudad: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    });

    if (!this.nuevo) {
      this.anadirEditar = true;
      this.skull=true;
      this.contenido=true;
    } else {
      this.anadirEditar = false;
      console.log("EDITAR")

      this.listar_cliente();
      
    }

    if (!this.anadirEditar) {
    
    }
  }

  get errorControl() {
    return this.nuevoForm.controls;
  }

  async consultarCedula($event) {
    //console.log($event.target.value);
    var cedula = $event.target.value;
    console.log(cedula.length)

    if (cedula.length < 10 || (cedula.length > 10 && cedula.length < 13)) {
      this.controlCedula=true;
    }
    if (cedula.length == 10 || cedula.length == 13 ) {

      var cedvalida = this.utilService.validadorDeCedula(cedula);

      if (cedvalida == true) {
        this.controlCedula=false;
      }else{
        this.controlCedula=true;
      }
    }


  }

  submitForm() {
console.log("controlcedula",this.controlCedula)
    this.isSubmitted = true;
    if (!this.nuevoForm.valid || this.controlCedula) {
      console.log('Please provide all the required values!')
      console.log(this.nuevoForm.value);
      console.log(String(this.nuevoForm.value.telefono))
      return false;
    } else {

      if (!this.anadirEditar) {
        console.log("Actualizar")

        this.nuevoForm.value.cliente = this.nuevo.name
        console.log(this.nuevoForm.value);
        this.editarCliente(this.nuevoForm.value);
      } else {
        console.log("Agregar")

        this.nuevoForm.value.compania = this.compania;
        console.log(this.nuevoForm.value)
        this.guardarCliente(this.nuevoForm.value);
      }



    }
  }
  //GUARDAR CLIENTE
  async guardarCliente(data) {
    const loading = await this.loadingController.create({ message: "Guardando...." });
    await loading.present();
    this.clientesService.crear_cliente(data).subscribe(res => {
      console.log(res["message"]);
      loading.dismiss();
      if (res["message"].estado == true) {
        this.utilService.success_msg("Cliente creado");
        this.atrasNuevo('nuevo');

      } else {
        var error = (res["message"].mensajeError).substring(17, 67);
        this.utilService.showErrorAlert(error)
      }
    })
  }
  onBack() {
    this.navController.back();

  }
  //EDITAR CLIENTE
  async editarCliente(data) {
    var count = 0;
    Object.entries(this.nuevoFormAux).forEach((element, i) => {
      console.log(element[1])
      console.log(Object.entries(data)[i][1])
      if (element[1] == Object.entries(data)[i][1]) {
        count += 1;
      }

    });
    console.log(count)
    if (count == 7) {
      console.log("SIN CAMBIOS")
      this.utilService.showToast("Sin cambios...","dark","top")
    } else {
      console.log("VA A ACTUALIZR")
      const loading = await this.loadingController.create({ message: "Actualizando...." });
      await loading.present();
      this.clientesService.actualizar_cliente(data).subscribe(res => {
        console.log(res["message"]);
        loading.dismiss();
        if (res["message"].estado == true) {
          this.utilService.success_msg("Actualizado");
          this.atrasNuevo('editar');

        } else {
          var error = (res["message"].mensajeError).substring(17, 67);
          this.utilService.showErrorAlert(error)
        }
      })
    }



  }

  atrasNuevo(val) {
    this.modalController.dismiss(val);
    /* console.log("atrasnuevo")
    //this.router.navigate (['/tabs/tab3'])

    this.navController.back(); */
  }


}
