import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login_auth/login/login.component';
import { RegisterComponent } from './auth/register_auth/register/register.component';


const routes: Routes = [
  {path:'', redirectTo:"authenticate", pathMatch:"full"},
  {path:'authenticate', loadChildren:()=> import(`./auth/auth.module`).then(m=>m.AuthModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
