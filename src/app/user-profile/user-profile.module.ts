import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout.component';
import { ProfileRoutingRoutingModule } from './profile-routing-routing.module';
import { SharedModuleModule } from '../shared-module.module';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffects } from './store/user_profile.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';



@NgModule({
  declarations: [ProfileLayoutComponent],
  imports: [
    CommonModule,
    ProfileRoutingRoutingModule,
    SharedModuleModule,
    EffectsModule.forFeature([UserProfileEffects])
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}
  ]
})
export class UserProfileModule { }
