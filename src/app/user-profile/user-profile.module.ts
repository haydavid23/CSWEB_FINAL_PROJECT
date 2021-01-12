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
import { UserInfoComponent } from './user-info/user-info.component';





@NgModule({
  declarations: [ProfileLayoutComponent, MyMapComponent, MyPlacesComponent, UserInfoComponent],
  imports: [
    CommonModule,
    ProfileRoutingRoutingModule,
    SharedModuleModule,
    EffectsModule.forFeature([UserProfileEffects]),
    // AgmCoreModule.forRoot({libraries:['places'], apiKey:'AIzaSyBYXy2iAn4e4tJC3d-06jvKyZ5U47PKkf0'})
    AgmCoreModule.forRoot({libraries:['places']})
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}
  ]
})
export class UserProfileModule { }
