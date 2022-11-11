import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeShellModule } from './containers/home-shell/home-shell.module';

const routes: Routes = [
  { path: ``, redirectTo: `home` },
  {
    path: 'home',
    loadChildren: () =>
      import('./containers/home-shell/home-shell.module').then(
        (m) => m.HomeShellModule
      )
  }
];
@NgModule({
  imports: [HomeShellModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
