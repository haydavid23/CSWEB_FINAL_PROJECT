import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout.component';
import { ProfileRoutingRoutingModule } from './profile-routing-routing.module';
import { SharedModuleModule } from '../shared-module.module';



@NgModule({
  declarations: [ProfileLayoutComponent],
  imports: [
    CommonModule,
    ProfileRoutingRoutingModule,
    SharedModuleModule
  ]
})
export class UserProfileModule { }
