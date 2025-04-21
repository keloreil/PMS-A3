import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AddPage } from './add/add.page';
import { PrivacyPage } from './privacy/privacy.page';
import { UpdatePage } from './update/update.page';
const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'add',
    component: AddPage,
  },
  {
    path: 'privacy',
    component: PrivacyPage,
  },
  {
    path: 'update',
    component: UpdatePage,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
