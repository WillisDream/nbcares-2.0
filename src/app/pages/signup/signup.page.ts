import { TaskService } from './../../services/task.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  LoadingController,
  IonRouterOutlet,
  MenuController,
  AlertController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { Browser } from 'protractor';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  showWarnings: boolean = false;
  formDatas: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private taskService: TaskService
  ) {}

  async ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ])
      ),
    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
        loadingEl.present();

        this.auth
          .registerUser({
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
          })
          .then(
            (res) => {
              let data = {
                dateCreated: new Date(),
                dateEdited: new Date(),
                name: this.signupForm.value.name,
                email: this.signupForm.value.email,
                uid: res.user.uid,
                points: 200,
                isFormFilled: false,
              };
              this.userService.addUser(data, res.user.uid).subscribe(
                (resp) => {
                  this.taskService.initAllTasks(res.user.uid).subscribe(
                    (response) => {
                      loadingEl.dismiss();
                      this.signupForm.reset();
                      this.showWarnings = false;
                      localStorage.setItem('user', JSON.stringify(data));
                      this.navCtrl.navigateRoot('/sign-form');
                    },
                    (err) => {
                      loadingEl.dismiss();
                      this.alertService.showFirebaseAlert(err);
                    }
                  );
                },
                (err) => {
                  loadingEl.dismiss();
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
    } else {
      this.showWarnings = true;
    }
  }
}
