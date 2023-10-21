import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceDashPage } from './finance-dash.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceDashPage,
    children: [
      {
        path: 'annee',
        loadChildren: () => import('../finance-annee-dash/finance-annee-dash.module').then( m => m.FinanceAnneeDashPageModule)
      },
      {
        path: 'jour',
        loadChildren: () => import('../finance-jour-dash/finance-jour-dash.module').then( m => m.FinanceJourDashPageModule)
      },
      {
        path: 'mois',
        loadChildren: () => import('../finance-mois-dash/finance-mois-dash.module').then( m => m.FinanceMoisDashPageModule)
      },
      {
        path: '',
        redirectTo: 'mois',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceDashPageRoutingModule {}
