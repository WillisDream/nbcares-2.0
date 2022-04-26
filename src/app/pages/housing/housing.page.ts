import { SelectDatePage } from './../select-date/select-date.page';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from './../../services/task.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AddTaskPage } from './../add-task/add-task.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ModalController,
  LoadingController,
  IonDatetime,
  AlertController,
} from '@ionic/angular';
import { ScoreService } from 'src/app/services/score.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.page.html',
  styleUrls: ['./housing.page.scss'],
})
export class HousingPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  totalScore;
  items = [];
  taskId;

  constructor(
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private taskService: TaskService,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ionViewWillEnter() {
    this.totalScore = JSON.parse(localStorage.getItem('user')).points;
  }

  ngOnInit() {
    var that = this;
    this.afAuth.onAuthStateChanged(function (user) {
      if (user) {
        that.loadHousingTasks(user.uid);
      }
    });
  }

  loadHousingTasks(uid) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.taskService.getAllUserTasks(uid).subscribe(
        (res: any) => {
          loadingEl.dismiss();

          this.items = res[0].housingTasks;
          this.taskId = res[0].id;
          console.log(res);

          console.log('REs', this.items);
        },
        (err) => {
          loadingEl.dismiss();
          this.alertService.showFirebaseAlert(err);
        }
      );
    });
  }

  async completeTask(task) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode: 'ios',
      message: 'Are you sure you want to to complete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.doCompleteTask(task);
          },
        },
      ],
    });
    await alert.present();
  }

  doCompleteTask(task) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      task.isCompleted = true;
      task.completedDate = new Date();
      let data = {
        housingTasks: this.items,
      };
      this.taskService
        .updateTask(localStorage.getItem('id'), this.taskId, data)
        .subscribe(
          (res) => {
            loadingEl.dismiss();
            this.totalScore = this.totalScore + 100;
            this.userService
              .updateUser(localStorage.getItem('id'), {
                points: this.totalScore,
              })
              .subscribe(
                (res) => {},
                (err) => {
                  this.alertService.showFirebaseAlert(err);
                }
              );
          },
          (err) => {
            loadingEl.dismiss();
            this.alertService.showFirebaseAlert(err);
          }
        );
    });
  }

  async addTask(isEditing, task?) {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage,
      componentProps: {
        id: isEditing ? task.id : this.items.length + 1,
        task: task ? task : null,
        isEditing: isEditing,
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        // this.formDatas = res.data;
        console.log(res.data);
        if (isEditing) {
          this.items.forEach((item) => {
            if (item.id == res.data.id) {
              (item.task = res.data.task),
                (item.deadLine = res.data.deadLine
                  ? res.data.deadLine
                  : item.deadLine);
            }
          });
        } else {
          this.items.push(res.data);
        }
        this.updateTasks();
      }
    });
    return await modal.present().catch((err) => {
      console.log(err);
    });
  }

  async addDeadLine(item) {
    const modal = await this.modalCtrl.create({
      component: SelectDatePage,
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        console.log(res.data);
        item.deadLine = moment(res.data).toDate();
        console.log(item.deadLine);
        this.updateTasks();
      }
    });
    return await modal.present().catch((err) => {
      console.log(err);
    });
  }


  updateTasks() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      let data = {
        housingTasks: this.items,
      };
      this.taskService
        .updateTask(localStorage.getItem('id'), this.taskId, data)
        .subscribe(
          (res) => {
            loadingEl.dismiss();
          },
          (err) => {
            console.log(err);
            console.log();

            loadingEl.dismiss();
            this.alertService.showFirebaseAlert(err);
          }
        );
    });
  }


  getFormattedTime(date: any) {

    if (date instanceof Date) return date;
    else if (date) return moment(date.toDate()).format('YYYY-MM-DD hh:mm:a');
  }
}
