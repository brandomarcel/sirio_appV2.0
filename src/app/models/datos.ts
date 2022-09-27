export class Datos {
    cliente: string
    company: string
    productos: Producto[]
  }
  
  export interface Producto {
    item_code: string
    qty: number
    rate: number
  }