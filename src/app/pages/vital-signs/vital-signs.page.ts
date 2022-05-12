import { AlertController } from '@ionic/angular';
import { AlertService } from './../../services/alert.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.page.html',
  styleUrls: ['./vital-signs.page.scss'],
})
export class VitalSignsPage implements OnInit {
  currentSegment = '2';
  selfAssessmentForm: FormGroup;
  tableDatasForm : FormGroup;

  selfAssessmentCurrentPoints;

  user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private alertController : AlertController
  ) {}

  ngOnInit() {
    this.tableDatasForm = this.formBuilder.group({
      monthlyIncome : new FormControl(null, Validators.required),
      creditScore : new FormControl(null, Validators.required),
      emergenyFund : new FormControl(null, Validators.required),
    })
    this.selfAssessmentForm = this.formBuilder.group({
      life: new FormControl(null, Validators.required),
      visionOfSelf: new FormControl(null, Validators.required),
      physicalHealth: new FormControl(null, Validators.required),
      mentalHealth: new FormControl(null, Validators.required),
      housing: new FormControl(null, Validators.required),
      community: new FormControl(null, Validators.required),
      network: new FormControl(null, Validators.required),
      job: new FormControl(null, Validators.required),
      education: new FormControl(null, Validators.required),
    });

    var that = this;
    this.afAuth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("Here changes");
        
        that.listenToUser(user.uid);
      }
    });
    this.selfAssessmentForm.valueChanges.subscribe((res) => {
      let score = 0;
      for (const item in this.selfAssessmentForm.value) {
        if (this.selfAssessmentForm.value[item]) {
          score = score + this.selfAssessmentForm.value[item];
        }
      }
      console.log('Score,', score);
      this.selfAssessmentCurrentPoints = score;
    });
  }

  listenToUser(uid) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.userService.listenToCurrentUser(uid).subscribe((res) => {
        console.log("listening inside ");
        
        if (res) {
          loadingEl.dismiss();
          this.user = res;
          if (this.user.selfAssessmentValues) {
            this.selfAssessmentForm.patchValue(this.user.selfAssessmentValues);
            this.selfAssessmentCurrentPoints = this.user.selfAssessmentCurrentPoints;
          }
          this.tableDatasForm.patchValue({
            monthlyIncome : this.user.monthlyIncome? this.user.monthlyIncome : null,
            creditScore : this.user.creditScore? this.user.creditScore : null,
            emergenyFund : this.user.emergenyFund? this.user.emergenyFund : null,
          })
          if(!this.user.monthlyIncome && !this.user.tableDatasUpdatedDate){
            this.showCompleteTableAlert();
          }else{
            this.validateDates();
          }
        }
      });
    });
  }

  async showCompleteTableAlert(){
    const alert = await this.alertController.create({
      header: 'Alert',
      message:
        'Please complete the vital signs every quarter',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: (blah) => {},
        },
        
      ],
    });
    await alert.present();
  }

  async validateDates(){
  let diff =  moment(new Date()).diff(this.user.tableDatasUpdatedDate.toDate(), 'months', true);
  console.log(diff);
  if(diff > 3){
    const alert = await this.alertController.create({
      header: 'Alert',
      backdropDismiss : false,
      message:
        'You should complete the vital signs every quarter, Please complete it now! Your current datas will be moved to BaseLine Data',
      buttons: [
        {
          text: 'Okay',
          handler: (blah) => {
            let data = {
              monthlyIncome : null,
              creditScore : null,
              emergenyFund : null,
              monthlyIncomePrevious : this.user.monthlyIncome? this.user.monthlyIncome : 0,
              creditScorePrevious : this.user.creditScore? this.user.creditScore : 0,
              emergenyFundPrevious : this.user.emergenyFund? this.user.emergenyFund : 0,
              tableDatasUpdatedDate : new Date()
            }
            this.updateUser(data);
          },
        },
 
      ],
    });
    await alert.present();
  }
  
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }

  submitSelfAssessment() {
    console.log(this.selfAssessmentForm.value);
    let data = {
      selfAssessmentValues: this.selfAssessmentForm.value,
      selfAssessmentUpdatedDate: new Date(),
      selfAssessmentPreviousPoints: this.user.selfAssessmentCurrentPoints
        ? this.user.selfAssessmentCurrentPoints
        : 0,
      selfAssessmentCurrentPoints: this.selfAssessmentCurrentPoints,
    };
    this.updateUser(data);
  }

  updateUser(data) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.userService.updateUser(localStorage.getItem('id'), data).subscribe(
        (res) => {
          loadingEl.dismiss();
        },
        (err) => {
          loadingEl.dismiss();
          this.alertService.showFirebaseAlert(err);
        }
      );
    });
  }

  submitTableDatas(){
    if(this.tableDatasForm.valid){
      let data = {
        monthlyIncome : this.tableDatasForm.value.monthlyIncome,
        creditScore : this.tableDatasForm.value.creditScore,
        emergenyFund : this.tableDatasForm.value.emergenyFund,
        monthlyIncomePrevious : this.user.monthlyIncome? this.user.monthlyIncome : this.user.monthlyIncomePrevious? this.user.monthlyIncomePrevious : 0,
        creditScorePrevious : this.user.creditScore? this.user.creditScore : this.user.creditScorePrevious? this.user.creditScorePrevious : 0,
        emergenyFundPrevious : this.user.emergenyFund? this.user.emergenyFund : this.user.emergenyFundPrevious? this.user.emergenyFundPrevious : 0,
        tableDatasUpdatedDate : new Date()
      }
      this.updateUser(data);
    }
  }
}
