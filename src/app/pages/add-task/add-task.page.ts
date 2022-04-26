import { ToastService } from './../../services/toast.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  taskName = '';
  @Input('id') id;
  @Input('task') task;
  @Input('isEditing') isEditing;
  

  constructor(private modalCtrl : ModalController, private toastService : ToastService) { }

  ngOnInit() {
    if(this.isEditing){
      console.log(this.task.deadLine.toDate().toISOString());
      
      this.taskName = this.task.task;
      this.datetime.value = this.task.deadLine? this.task.deadLine.toDate().toISOString() : null;
    }
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }


  addTask(){
   console.log( this.datetime.value);
   if(this.taskName){
    let data = {
      deadLine : this.datetime.value ? moment(this.datetime.value).toDate() : null,
      isCompleted : false,
      task : this.taskName,
      id : this.id,
      userAdded : true
     }
     this.modalCtrl.dismiss(data);
   }else{
     this.toastService.presentToast("Please enter task name");
   }
  }

}
