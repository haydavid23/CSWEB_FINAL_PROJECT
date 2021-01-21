import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[uploadPictures]'
})
export class UploadPicturesDirective {

  constructor() { }

  @Output() picturesDropped = new EventEmitter<any>();


  @HostListener('dragover') onDragOver(evt) {
 
    this.fileover = true
  }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {

      this.fileover = false
   
 
    }
  
    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
    console.log(evt)
      evt.preventDefault();
      evt.stopPropagation();
      
      let files = evt.dataTransfer.files;
    
      if (files.length > 0) {
    
        this.picturesDropped.emit(files);
      }
      this.fileover = false
  }

  @HostBinding("class.fileover") fileover:boolean;

}
