import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-app-dialog-msg',
  templateUrl: './app-dialog-msg.component.html',
  styleUrls: ['./app-dialog-msg.component.css']
})
export class AppDialogMsgComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  

  ngOnInit() {
  }

}
