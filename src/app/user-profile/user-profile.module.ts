import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout.component';
import { ProfileRoutingRoutingModule } from './profile-routing-routing.module';
import { SharedModuleModule } from '../shared-module.module';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffects } from './store/user_profile.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';
import { MyMapComponent } from './my-map/my-map.component';
import { MyPlacesComponent } from './my-places/my-places.component';
import { AgmCoreModule } from '@agm/core';





@NgModule({
  declarations: [ProfileLayoutComponent, MyMapComponent, MyPlacesComponent],
  imports: [
    CommonModule,
    ProfileRoutingRoutingModule,
    SharedModuleModule,
    EffectsModule.forFeature([UserProfileEffects]),
    AgmCoreModule.forRoot({libraries:['places']})

  ],
  providers:[
    {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}
  ]
})
export class UserProfileModule { }
