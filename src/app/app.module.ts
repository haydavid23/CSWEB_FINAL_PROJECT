import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { SharedModuleModule } from './shared-module.module';
import { ErrorComponentComponent } from './shared_components/error-component/error_msg/error-component.component';
import { UserProfileGuardService } from './routing_guards/userprofile-guard.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';




@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    StoreModule.forRoot(appReducer,{}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()

 
  ],
  providers: [UserProfileGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
