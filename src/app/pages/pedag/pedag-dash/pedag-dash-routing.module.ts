import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedagDashPage } from './pedag-dash.page';

const routes: Routes = [
  {
    path: '',
    component: PedagDashPage,
    children: [
      {
        path: 'jour',
        loadChildren: () => import('../pedag-jour-dash/pedag-jour-dash.module').then( m => m.PedagJourDashPageModule)
      },
      {
        path: 'mois',
        loadChildren: () => import('../pedag-mois-dash/pedag-mois-dash.module').then( m => m.PedagMoisDashPageModule)
      },
      {
        path: '',
        redirectTo: 'mois',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedagDashPageRoutingModule {}
