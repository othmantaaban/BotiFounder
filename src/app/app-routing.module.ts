import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/api/auth-guard.service';
import { GuestGuardService } from './services/api/guest-guard.service';
import { SchoolGuardService } from './services/school-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [GuestGuardService],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tabs',
    canActivate: [SchoolGuardService,AuthGuardService],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'loading-page',
    loadChildren: () => import('./pages/loading-page/loading-page.module').then( m => m.LoadingPagePageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  {
    path: 'login',
    canActivate: [SchoolGuardService,GuestGuardService],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    canActivate: [SchoolGuardService,AuthGuardService],
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'finance-dash',
    canActivate: [SchoolGuardService,AuthGuardService],
    loadChildren: () => import('./pages/Finnance/finance-dash/finance-dash.module').then( m => m.FinanceDashPageModule)
  },
  {
    path: 'admin',
    canActivate: [SchoolGuardService,AuthGuardService],
    loadChildren: () => import('./pages/admin/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'pedag-dash',
    canActivate: [SchoolGuardService,AuthGuardService],
    loadChildren: () => import('./pages/pedag/pedag-dash/pedag-dash.module').then( m => m.PedagDashPageModule)
  },
  {
    path: 'usage-dash',
    canActivate: [SchoolGuardService,AuthGuardService],
    loadChildren: () => import('./pages/usage/usage-dash/usage-dash.module').then( m => m.UsageDashPageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
