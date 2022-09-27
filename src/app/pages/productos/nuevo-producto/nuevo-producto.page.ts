import { ProductosService } from './../../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.page.html',
  styleUrls: ['./nuevo-producto.page.scss'],
})
export class NuevoProductoPage implements OnInit {
  @Input() nuevo: any = [];
  nuevoForm: FormGroup;
  isSubmitted = false;
  compania: any;
  user: any;
  anadirEditar: any;
  nuevoFormAux: any = [];
  controlCedula: any;
  listaIva: any = [];
  id: any;
  skull: boolean;
  contenido: boolean;

  constructor(private navController: NavController,
    public formBuilder: FormBuilder,
    private utilService: UtilService,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private productosService: ProductosService) {
    this.utilService.getStorage("compania").then(res => {
      this.compania = res;
    });
    this.utilService.getStorage("user").then(res => {
      this.user = res;
    })

    console.log("entro nuevo productos")

  }

  async buscador() {
    console.log("entro buscador")

    this.nuevoForm.patchValue(this.nuevo);

    this.skull = true;
    this.contenido = true;
    this.anadirEditar=false;
    this.nuevoFormAux = {
      "company": this.nuevo.company,
      "user": "",
      "grupo": this.nuevo.grupo,
      "nombre_producto": this.nuevo.nombre_producto,
      "pvp": this.nuevo.pvp,
      "marca": this.nuevo.marca,
      "descripcion": this.nuevo.descripcion,
      "impuesto": this.nuevo.impuesto,
    };
  }


  controlPagina() {
    console.log("ionViewWillEnter", this.nuevo)
    if (this.nuevo) {
      this.buscador()
    } 

  }
  ngOnInit() {
    console.log("ngOnInit")

    console.log(this.nuevo)
    if (!this.nuevo ) {
      this.anadirEditar = true;
      this.skull = true;
      this.contenido = true;
    } else {
      this.anadirEditar = false;
    }

    console.log("id:", this.id)
    this.listar_iva();
    this.nuevoForm = this.formBuilder.group({
      company: [''],
      user: [''],
      grupo: ['', [Validators.required]],
      nombre_producto: ['', [Validators.required]],
      pvp: ['', [Validators.required, Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
      marca: [''],
      descripcion: ['', [Validators.required]],
      impuesto: ['', [Validators.required]],

    })
  }
  get errorControl() {
    return this.nuevoForm.controls;
  }

  listar_iva() {
    this.productosService.listar_iva().subscribe(res => {
      console.log(res)
      this.listaIva = res["message"].datoList;

      this.controlPagina();
    }, error => {
      this.utilService.showToast("Error de conexion..!", "danger", "top")
      console.error(error.message)

      //this.errorConexion();
    });
  }

  submitForm() {
    //console.log(this.nuevoForm.value)
    this.isSubmitted = true;
    if (!this.nuevoForm.valid) {
      console.log('Eror Submit!', this.nuevoForm.value)

      return false;
    } else {

      if (!this.anadirEditar) {
        console.log("Actualizar")

        this.nuevoForm.value.producto_id = this.nuevo.name


        console.log(this.nuevoForm.value);
        this.editarProducto(this.nuevoForm.value);
      } else {
        console.log("Agregar")

        console.log(this.nuevoForm.value)
        this.nuevoForm.value.company = this.compania;
        this.nuevoForm.value.user = this.user
        this.guardarProducto(this.nuevoForm.value);
      }



    }
  }
  //GUARDAR PRODUCTO
  async guardarProducto(data) {
    const loading = await this.loadingController.create({ message: "Guardando...." });
    await loading.present();
    console.log(data)
    this.productosService.crear_producto(data).subscribe(res => {
      console.log(res)
      loading.dismiss();
      if (res["message"].estado == true) {
        this.utilService.success_msg("Producto creado");
        this.atrasNuevo("");
      } else {
        var error = (res["message"].mensajeError).substring(17, 67);
        this.utilService.showErrorAlert(error)
      }
    }, error => {
      loading.dismiss();
      console.error(error)
      this.utilService.errorToast("Error de conexion!")
    })
  }


  //EDITAR PRODUCTO
  async editarProducto(data) {
    var count = 0;

    Object.entries(this.nuevoFormAux).forEach((element, i) => {

      if (element[1] == Object.entries(data)[i][1]) {
        count += 1;
      }

    });
    console.log(count)
    if (count == 8) {
      console.log("SIN CAMBIOS")
      this.utilService.showToast("Sin cambios...", "dark", "top")
    } else {
      console.log("VA A ACTUALIZR")
      // console.log(data.marca)
      if (!data.marca) {
        data.marca = "";
      }


      const loading = await this.loadingController.create({ message: "Validando...." });
      await loading.present();
      this.productosService.actualizar_producto(data).subscribe(res => {
        console.log(res["message"]);
        loading.dismiss();
        if (res["message"].estado == true) {
          this.utilService.success_msg("Actualizado");
          this.atrasNuevo("editar");

        } else {
          var error = (res["message"].dato);
          this.utilService.showErrorAlert(error)
        }
      }, error => {
        this.utilService.showToast("Error de conexion..!", "danger", "top")
        console.error(error.message)
        loading.dismiss();
        //this.errorConexion();
      })
    }



  }

  atrasNuevo(val) {
    this.modalController.dismiss(val);
    console.log("atrasnuevo")
    //this.router.navigate (['/tabs/tab3'])
    //this.navController.back();
  }


}
