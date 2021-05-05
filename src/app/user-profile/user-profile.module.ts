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
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { UploadPicturesComponent } from '../shared_components/upload-pictures/upload-pictures.component';
import { UploadPicturesDirective } from '../shared_components/upload-pictures/upload-pictures.directive';
import { UploadNewPicturesComponent } from './upload-new-pictures/upload-new-pictures.component';
import { AssignTripDialogBtn, AssignTripDialogComponent } from '../components/assign-trip-dialog/assign-trip-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectTripComponent } from '../components/select-trip/select-trip.component';
import { PinPictureBtnDialog, PinPictureDialogComponent } from '../components/pin-picture-dialog/pin-picture-dialog.component';
import { DialogLoadingSpinnerComponent } from '../components/dialog-loading-spinner/dialog-loading-spinner.component';
import { MsgDialogComponent } from '../components/msg-dialog/msg-dialog.component';





@NgModule({
  declarations: [ProfileLayoutComponent, 
    MyMapComponent, MyPlacesComponent, 
    UserInfoComponent, CountryDetailComponent,
     UploadPicturesComponent,
     UploadPicturesDirective,
     UploadNewPicturesComponent,
     AssignTripDialogComponent,
     AssignTripDialogBtn,
     SelectTripComponent,
     PinPictureBtnDialog,
     PinPictureDialogComponent,
     DialogLoadingSpinnerComponent,
     MsgDialogComponent
    ],
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
  ],
  entryComponents:[
    AssignTripDialogBtn,
    AssignTripDialogComponent,
    PinPictureBtnDialog,
    PinPictureDialogComponent,
    DialogLoadingSpinnerComponent,
    MsgDialogComponent

  ]
})
export class UserProfileModule { }
