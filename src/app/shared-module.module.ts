import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNavList, MatSidenavModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponentComponent } from './shared_components/error-component/error_msg/error-component.component';



@NgModule({
  declarations: [
    ErrorComponentComponent
  ],
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports:[
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ErrorComponentComponent
  ]
})
export class SharedModuleModule { }
