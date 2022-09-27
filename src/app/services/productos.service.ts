import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { UtilService } from './util.service';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiURL = environment.apiUrl;
  token:any;
  compania:any;
  abbr:any;

  constructor(public apiService: ApiService, private http: HttpClient,
    private utilService:UtilService) {/* 
      this.utilService.getStorage("token").then(res=>{
        this.token=res;
        
      })
      this.utilService.getStorage("compania").then(res=>{
        this.compania=res;
      })
      this.utilService.getStorage("abbr").then(res=>{
        this.abbr=res;
      }); */
      this.cargarDatos();
  }

  async cargarDatos(){
    
    console.log("cargarDatos")
this.compania= await this.utilService.getStorage("compania");
this.token= await this.utilService.getStorage("token");
this.abbr= await this.utilService.getStorage("abbr");

   
  }
  crear_producto(data){
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization':  this.token
      })
    };

    const param = this.apiService.JSON_to_URLEncoded(data);
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.producto.crear_producto"
    return this.http.post(url, param, header);
  }

  actualizar_producto(data){
      const header = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization':  this.token
        })
      };

      const param = this.apiService.JSON_to_URLEncoded(data);
      const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.producto.actualizar_producto"

      return this.http.post(url, param, header);
    }

    eliminar_producto(data){
      
      const header = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization':  this.token
        })
      };

      const param = this.apiService.JSON_to_URLEncoded(data);
      const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.producto.eliminar_producto"

      return this.http.post(url, param, header);
    }

  listar_productos(compania,abbr,token){
   
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization':  token
      })
    };

    let datos ={company:compania,texto_referencia:abbr};
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.producto.listar_productos"
    return this.http.post(url, datos, header);
  }


  listar_iva(){
    
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization':  this.token
      })
    };

    let datos ={company:this.compania};
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.producto.listar_iva"
    return this.http.post(url, datos, header);
  }

}
