import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.page.html',
  styleUrls: ['./select-date.page.scss'],
})
export class SelectDatePage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

  saveDate(){
    console.log(this.datetime.value);
    
    this.modalCtrl.dismiss(this.datetime.value)
  }

}
