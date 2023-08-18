import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './component/display/display.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddDataComponent } from './component/add-data/add-data.component';
import { AuthGuardService } from './auth-guard.service';
import { EditDataComponent } from './component/edit-data/edit-data.component'



const routes: Routes = [
  //{ path: '/display/data/s', redirectTo: '/', pathMatch: 'full' },
  //{ path: 'display/data', component: DisplayComponent },
  { path: '', component: DisplayComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add/data', component: AddDataComponent, canActivate: [AuthGuardService] },
  { path: 'edit/data', component: EditDataComponent, canActivate: [AuthGuardService] }

  //{ path: 'display/data', redirectTo: 'https://latool.github.io/', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
