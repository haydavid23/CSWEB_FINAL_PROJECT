import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared_components/error-component/page_not_found/page-not-found/page-not-found.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { MyMapComponent } from './my-map/my-map.component';
import { MyPlacesComponent } from './my-places/my-places.component';
import { ProfileLayoutComponent } from './profile-layout.component';
import { UploadPicturesComponent } from '../shared_components/upload-pictures/upload-pictures.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UploadNewPicturesComponent } from './upload-new-pictures/upload-new-pictures.component';


const routes: Routes = [
  {path: '', component: ProfileLayoutComponent, children:[
    { path: '', redirectTo:'my_map'},
    { path: 'my_map', component:MyMapComponent},
    { path: 'my_places', component:MyPlacesComponent},
    { path: 'user-info', component:UserInfoComponent},
    { path: 'upload_new_pictures', component:UploadNewPicturesComponent},
    { path: 'details/:country', component:CountryDetailComponent}

  ]},
  {path: 'page_not_found', component: PageNotFoundComponent},
  {path: '**', redirectTo:"page_not_found"},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingRoutingModule { }
