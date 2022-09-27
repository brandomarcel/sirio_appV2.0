import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/gestion-clientes/gestion-clientes.module').then(m => m.GestionClientesPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('../productos/gestion-productos/gestion-productos.module').then(m => m.GestionProductosPageModule)
      },
      {
        path: 'facturas',
        loadChildren: () => import('../facturas/gestion-facturas/gestion-facturas.module').then(m => m.GestionFacturasPageModule)
      },
      {
        path: 'gestioncreditos',
        loadChildren: () => import('../facturas/gestioncreditos/gestioncreditos.module').then(m => m.GestioncreditosPageModule)
      },
      {
        path: 'nuevo-producto',
        loadChildren: () => import('../productos/nuevo-producto/nuevo-producto.module').then( m => m.NuevoProductoPageModule)
      },
      {
        path: 'gestion-facturas',
        loadChildren: () => import('../facturas/gestion-facturas/gestion-facturas.module').then( m => m.GestionFacturasPageModule)
      },
      {
        path: 'nueva-factura',
        loadChildren: () => import('../facturas/nueva-factura/nueva-factura.module').then( m => m.NuevaFacturaPageModule)
      },
      {
        path: 'productos-factura',
        loadChildren: () => import('../facturas/productos-factura/productos-factura.module').then( m => m.ProductosFacturaPageModule)
      },
      {
        path: 'detallefactura',
        loadChildren: () => import('../facturas/detallefactura/detallefactura.module').then( m => m.DetallefacturaPageModule)
      },
      {
        path: 'gestion-productos',
        loadChildren: () => import('../productos/gestion-productos/gestion-productos.module').then( m => m.GestionProductosPageModule)
      },
      {
        path: 'nuevo-producto',
        loadChildren: () => import('../productos/nuevo-producto/nuevo-producto.module').then( m => m.NuevoProductoPageModule)
      },
      {
        path: 'gestion-clientes',
        loadChildren: () => import('../clientes/gestion-clientes/gestion-clientes.module').then( m => m.GestionClientesPageModule)
      },
      {
        path: 'nuevo-cliente',
        loadChildren: () => import('../clientes/nuevo-cliente/nuevo-cliente.module').then( m => m.NuevoClientePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
