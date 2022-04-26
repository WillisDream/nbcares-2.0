import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./users/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'housing',
    loadChildren: () => import('./pages/housing/housing.module').then( m => m.HousingPageModule)
  },
  {
    path: 'health',
    loadChildren: () => import('./pages/health/health.module').then( m => m.HealthPageModule)
  },
  {
    path: 'finances',
    loadChildren: () => import('./pages/finances/finances.module').then( m => m.FinancesPageModule)
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/education/education.module').then( m => m.EducationPageModule)
  },
  {
    path: 'career',
    loadChildren: () => import('./pages/career/career.module').then( m => m.CareerPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'sign-form',
    loadChildren: () => import('./pages/sign-form/sign-form.module').then( m => m.SignFormPageModule)
  },
  {
    path: 'vital-signs',
    loadChildren: () => import('./pages/vital-signs/vital-signs.module').then( m => m.VitalSignsPageModule)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./pages/add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path: 'select-date',
    loadChildren: () => import('./pages/select-date/select-date.module').then( m => m.SelectDatePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./pages/resources/resources.module').then( m => m.ResourcesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
