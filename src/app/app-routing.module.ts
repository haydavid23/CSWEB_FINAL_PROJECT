import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UserProfileGuardService } from './routing_guards/userprofile-guard.service';



const routes: Routes = [
  {path:'', redirectTo:"authenticate", pathMatch:"full"},
  {path:'authenticate', loadChildren:()=> import(`./auth/auth.module`).then(m=>m.AuthModule)},
  {path:'profile/:userId', loadChildren:()=> import(`./user-profile/user-profile.module`).then(m=>m.UserProfileModule),
   canActivate:[UserProfileGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
