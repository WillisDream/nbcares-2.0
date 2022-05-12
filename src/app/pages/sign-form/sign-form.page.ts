import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import * as moment from 'moment';
import { SignaturePadComponent } from 'src/app/components/signature-pad/signature-pad.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.page.html',
  styleUrls: ['./sign-form.page.scss'],
})
export class SignFormPage implements OnInit {
  currentStep = 1;
  signDatas: any = {};
  name;
  signature1: any;
  signature2: any;

  ionViewWillEnter() {
    this.name = JSON.parse(localStorage.getItem('user')).name;
  }

  constructor(
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private navCtrl: NavController,
    private userService: UserService,
    private alertService: AlertService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  getDate() {
    return moment(new Date()).format('yyyy-MM-DD');
  }

  async addSignature(number) {
    const modal = await this.modalCtrl.create({
      component: SignaturePadComponent,
      componentProps: {
        date: 1,
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data.signatureAdded) {
        if (number == 1) this.signDatas.signature1 = res.data.signature;
        else this.signDatas.signature2 = res.data.signature;
      }
    });
    return await modal.present().catch((err) => {
      console.log(err);
    });
  }

  nextClicked() {
    if (this.signDatas.signature1) {
      this.currentStep = 2;
    } else {
      this.toastService.presentToast('Please add signature to continue');
    }
  }

  submitClicked() {
    console.log(this.signDatas);
    if(!this.signDatas.name || !this.signDatas.address || !this.signDatas.phone){
      this.toastService.presentToast('Please fill all required fields');
      return;
    }
    if (!this.signDatas.signature2) {
      this.toastService.presentToast('Please add signature to continue');
      return;
    }
    let data = {
      isFormFilled: true,
    };
    let id = JSON.parse(localStorage.getItem('user')).uid;
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.userService.updateUser(id, data).subscribe(
        (res) => {
          localStorage.setItem('id', id)
          loadingEl.dismiss();
          this.navCtrl.navigateRoot('tabs/home');
        },
        (err) => {
          loadingEl.dismiss();
          this.alertService.showFirebaseAlert(err);
        }
      );
    });
  }
}
