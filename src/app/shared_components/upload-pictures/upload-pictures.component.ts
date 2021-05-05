import { Component, OnInit } from '@angular/core';
import * as userProfileActions from "../../user-profile/store/user_profile.actions"
import { Store } from '@ngrx/store';
import * as AppState from "../../store/app.reducer"
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-upload-pictures',
  templateUrl: './upload-pictures.component.html',
  styleUrls: ['./upload-pictures.component.css']
})
export class UploadPicturesComponent implements OnInit {

  constructor(private store:Store<AppState.AppState>) { }

  newTripInfo:FormGroup;

  pictures:Array<File> = [];

  ngOnInit() 
  {
    this.initNewTrip()
  }

  initNewTrip()
  {
    this.newTripInfo= new FormGroup({
      tripName:new FormControl(null),
      tripDescription: new FormControl(null),
      tripStartDate: new FormControl(null),
      tripEndDate: new FormControl(null)

    })
  }

  fileChange(file)
  {
    
  }

  beginUpload()
  {
    let formData = new FormData();
    formData.append("formValues", JSON.stringify(this.newTripInfo.value))

    this.pictures.forEach((picture, index)=>{
        formData.append(`picture${index}`,picture)
    })


 
    this.store.dispatch(new userProfileActions.UploadPictures(formData))
    
  }
  

  onFileDropped(files:FileList)
  {
   
    this.pictures =  [...this.pictures, ...Array.from(files)]
    
  }

  deleteDropPicture(deletedIndex)
  {
    this.pictures = this.pictures.filter((file:File, index)=>{
        return deletedIndex !== index
    })
  }

}
