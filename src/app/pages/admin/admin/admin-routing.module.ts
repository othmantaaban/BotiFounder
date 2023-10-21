import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'annee',
        loadChildren: () => import('../admin-annee-dash/admin-annee-dash.module').then( m => m.AdminAnneeDashPageModule)
      },
      {
        path: 'jour',
        loadChildren: () => import('../admin-jour-dash/admin-jour-dash.module').then( m => m.AdminJourDashPageModule)
      },
      {
        path: 'mois',
        loadChildren: () => import('../admin-mois-dash/admin-mois-dash.module').then( m => m.AdminMoisDashPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/admin/mois',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
