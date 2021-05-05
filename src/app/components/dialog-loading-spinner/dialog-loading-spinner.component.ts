import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-loading-spinner',
  templateUrl: './dialog-loading-spinner.component.html',
  styleUrls: ['./dialog-loading-spinner.component.css']
})
export class DialogLoadingSpinnerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:string) { }

  ngOnInit()
  {
  }

}
