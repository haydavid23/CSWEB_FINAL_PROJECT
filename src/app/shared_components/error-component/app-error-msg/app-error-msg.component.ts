import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-app-error-msg',
  templateUrl: './app-error-msg.component.html',
  styleUrls: ['./app-error-msg.component.css']
})
export class AppErrorMsgComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
    console.log(this.data)
  }

  

}




