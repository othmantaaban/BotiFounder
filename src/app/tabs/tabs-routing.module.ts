import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'finance-dash',
        loadChildren: () => import('../pages/Finnance/finance-dash/finance-dash.module').then( m => m.FinanceDashPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../pages/admin/admin/admin.module').then( m => m.AdminPageModule)
      },
      {
        path: 'pedag-dash',
        loadChildren: () => import('../pages/pedag/pedag-dash/pedag-dash.module').then( m => m.PedagDashPageModule)
      },

      
    
      // {
      //   path: 'finance-jour-dash',
      //   loadChildren: () => import('../pages/finance-jour-dash/finance-jour-dash.module').then( m => m.FinanceJourDashPageModule)
      // },
      // {
      //   path: 'finance-mois-dash',
      //   loadChildren: () => import('../pages/Finnance/finance-mois-dash/finance-mois-dash.module').then( m => m.FinanceMoisDashPageModule)
      // },
      // {
      //   path: 'finance-annee-dash',
      //   loadChildren: () => import('../pages/finance-annee-dash/finance-annee-dash.module').then( m => m.FinanceAnneeDashPageModule)
      // },
      // {
      //   path: 'admin-jour-dash',
      //   loadChildren: () => import('../pages/admin/admin-jour-dash/admin-jour-dash.module').then( m => m.AdminJourDashPageModule)
      // },
      // {
      //   path: 'admin-mois-dash',
      //   loadChildren: () => import('../pages/admin/admin-mois-dash/admin-mois-dash.module').then( m => m.AdminMoisDashPageModule)
      // },
      // {
      //   path: 'admin-annee-dash',
      //   loadChildren: () => import('../pages/admin-annee-dash/admin-annee-dash.module').then( m => m.AdminAnneeDashPageModule)
      // },
      // {
      //   path: 'pedag-jour-dash',
      //   loadChildren: () => import('../pages/pedag-jour-dash/pedag-jour-dash.module').then( m => m.PedagJourDashPageModule)
      // },
      // {
      //   path: 'pedag-mois-dash',
      //   loadChildren: () => import('../pages/pedag-mois-dash/pedag-mois-dash.module').then( m => m.PedagMoisDashPageModule)
      // },
      {
        path: 'usage-dash',
        loadChildren: () => import('../pages/usage/usage-dash/usage-dash.module').then( m => m.UsageDashPageModule)
      },
      {
        path: 'accueil',
        loadChildren: () => import('../pages/accueil/accueil.module').then( m => m.AccueilPageModule)
      },
      {
        path: 'suivi-inscription',
        loadChildren: () => import('../pages/suivi-inscription/suivi-inscription.module').then( m => m.SuiviInscriptionPageModule)
      },
      {
        path: '',
        redirectTo: 'finance-dash',
        pathMatch: 'full'
      },
      {
        path: 'remise-valider',
        loadChildren: () => import('../pages/remise-valider/remise-valider.module').then( m => m.RemiseValiderPageModule)
      },
      // {
      //   path: 'finance',
      //   loadChildren: () => import('../finance-tabs/finance-tabs.module').then(m => m.FinanceTabsPageModule)
      // },
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/finance-jour-dash',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
