import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared_components/error-component/page_not_found/page-not-found/page-not-found.component';
import { MyMapComponent } from './my-map/my-map.component';
import { MyPlacesComponent } from './my-places/my-places.component';
import { ProfileLayoutComponent } from './profile-layout.component';
import { UserInfoComponent } from './user-info/user-info.component';


const routes: Routes = [
  {path: '', component: ProfileLayoutComponent, children:[
    { path: '', redirectTo:'my_map'},
    { path: 'my_map', component:MyMapComponent},
    { path: 'my_places', component:MyPlacesComponent},
    { path: 'user-info', component:UserInfoComponent},
  ]},
  {path: 'page_not_found', component: PageNotFoundComponent},
  {path: '**', redirectTo:"page_not_found"},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingRoutingModule { }
