import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonDatetime, ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ScoreService } from 'src/app/services/score.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { AddTaskPage } from '../add-task/add-task.page';
import { SelectDatePage } from '../select-date/select-date.page';

@Component({
  selector: 'app-career',
  templateUrl: './career.page.html',
  styleUrls: ['./career.page.scss'],
})
export class CareerPage implements OnInit {
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
        that.loadCareerTasks(user.uid);
      }
    });
  }

  loadCareerTasks(uid) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.taskService.getAllUserTasks(uid).subscribe(
        (res: any) => {
          loadingEl.dismiss();

          this.items = res[0].careerTasks;
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
        careerTasks: this.items,
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
        id : this.items.length + 1
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        console.log(res.data);
        this.items.push(res.data);
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

  updateTasks(){
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      let data = {
        careerTasks: this.items,
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

  confirm() {
    this.datetime.cancel();
  }

  getFormattedTime(date: any) {

    if (date instanceof Date) return date;
    else if (date) return moment(date.toDate()).format('YYYY-MM-DD hh:mm:a');
  }
}
