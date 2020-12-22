import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModuleModule } from '../shared-module.module';
import { LoginComponent } from './login_auth/login/login.component';
import { RegisterComponent } from './register_auth/register/register.component';
import { AuthComponent } from './auth.component';
import { ErrorComponentComponent } from '../shared_components/error-component/login_error_msg/error-component.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ErrorComponentComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModuleModule
  ],
  exports:[
   
  ]
})
export class AuthModule { }
