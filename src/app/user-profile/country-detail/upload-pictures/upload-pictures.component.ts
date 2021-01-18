import { Component, OnInit } from '@angular/core';
import * as userProfileActions from "../../store/user_profile.actions"
import { Store } from '@ngrx/store';
import * as AppState from "../../../store/app.reducer"


@Component({
  selector: 'app-upload-pictures',
  templateUrl: './upload-pictures.component.html',
  styleUrls: ['./upload-pictures.component.css']
})
export class UploadPicturesComponent implements OnInit {

  constructor(private store:Store<AppState.AppState>) { }

  uploadedFiles:File[]

  ngOnInit() {
  }

  fileChange(file)
  {
    this.uploadedFiles=file.target.files
  }

  beginUpload()
  {
    let formData = new FormData()

    formData.append("files",this.uploadedFiles[0])

    this.store.dispatch(new userProfileActions.UploadPictures(formData)) 
    
  }

}
