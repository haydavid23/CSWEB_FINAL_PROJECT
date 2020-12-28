import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { SharedModuleModule } from './shared-module.module';
import { ErrorComponentComponent } from './shared_components/error-component/login_error_msg/error-component.component';
import { UserProfileGuardService } from './routing_guards/userprofile-guard.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PageNotFoundComponent } from './shared_components/error-component/page_not_found/page-not-found/page-not-found.component';
import { AppErrorMsgComponent } from './shared_components/error-component/app-error-msg/app-error-msg.component';
import { AppDialogMsgComponent } from './shared_components/error-component/app-dialog-msg/app-dialog-msg.component';







@NgModule({
  declarations: [
    AppComponent,
    AppDialogMsgComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    StoreModule.forRoot(appReducer,{}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),   
   

 
  ],
  providers: [UserProfileGuardService],
  bootstrap: [AppComponent],
  entryComponents:[AppDialogMsgComponent]

})
export class AppModule { }
