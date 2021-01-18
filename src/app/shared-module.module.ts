import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNavList, MatSidenavModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './shared_components/error-component/page_not_found/page-not-found/page-not-found.component';
import { AppErrorMsgComponent } from './shared_components/error-component/app-error-msg/app-error-msg.component';





@NgModule({
  declarations: [
 
    PageNotFoundComponent,
    AppErrorMsgComponent

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
    MatListModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule
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
    PageNotFoundComponent,
    MatDialogModule,
    AppErrorMsgComponent,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  entryComponents:[AppErrorMsgComponent]
})
export class SharedModuleModule { }
