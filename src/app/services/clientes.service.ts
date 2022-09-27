import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { UtilService } from './util.service';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ClientesService{
  private apiURL = environment.apiUrl;
  token:any;
  compania:any;
  abbr:any;
  constructor(public apiService: ApiService, private http: HttpClient,
    private utilService:UtilService) {
        this.utilService.getStorage("token").then(res=>{
        this.token=res;
      })
      this.utilService.getStorage("compania").then(res=>{
        this.compania=res;
      });
      this.utilService.getStorage("abbr").then(res=>{
        this.abbr=res;
      });

  }

 crear_cliente(data){
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization':  this.token
      })
    };

    const param = this.apiService.JSON_to_URLEncoded(data);
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.update.crear_cliente"
    return this.http.post(url, param, header);
  }
  actualizar_cliente(data){
    console.log(this.token)
      const header = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization':  this.token
        })
      };

      const param = this.apiService.JSON_to_URLEncoded(data);
      const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.update.actualizar_cliente"
     
      return this.http.post(url, param, header);
    }

    listar_cliente(compania,token){
   
     
      const header = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', 
          'Authorization':  token
        })
      };
      let datos = {compania:compania};
      const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.update.listar_cliente"
      return this.http.post(url, datos, header);
      
    }
    eliminar_cliente(data){
      
        const header = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization':  this.token
          })
        };
      
       
        const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.update.eliminar_cliente"
       
        return this.http.post(url, data, header);
      }
}
