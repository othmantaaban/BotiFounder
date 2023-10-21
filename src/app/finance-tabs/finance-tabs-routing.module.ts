import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceTabsPage } from './finance-tabs.page';

const routes: Routes = [
  {
    path: 'financeTabs',
    component: FinanceTabsPage,
    children: [
      {
        path: 'jour',
        loadChildren: () => import('../pages/finance-jour-dash/finance-jour-dash.module').then(m => m.FinanceJourDashPageModule)
      },
      {
        path: 'mois',
        loadChildren: () => import('../pages/finance-mois-dash/finance-mois-dash.module').then(m => m.FinanceMoisDashPageModule)
      },
      {
        path: 'annee',
        loadChildren: () => import('../pages/Finnance/finance-annee-dash/finance-annee-dash.module').then(m => m.FinanceAnneeDashPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/financeTabs/jour',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule],
})
export class FinanceTabsPageRoutingModule {}
