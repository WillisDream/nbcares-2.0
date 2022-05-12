import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  data = {
    createdDate : new Date(),
    healthTasks: [
      {
        task: 'Health Checkup',
        deadLine: null,
        id: 1,
        isCompleted: false,
      },
      {
        task: 'Nutrition / Exercise',
        deadLine: null,
        id: 2,
        isCompleted: false,
      },
      {
        task: 'Dental',
        deadLine: null,
        id: 3,
        isCompleted: false,
      },
      {
        task: 'Vision',
        deadLine: null,
        id: 4,
        isCompleted: false,
      },
      {
        task: 'Mental Health',
        deadLine: null,
        id: 5,
        isCompleted: false,
      },
    ],
    housingTasks: [
      {
        task: 'Needs Assessments',
        deadLine: null,
        id: 1,
        isCompleted: false,
      },
      {
        task: 'Budget',
        deadLine: null,
        id: 2,
        isCompleted: false,
      },
      {
        task: 'Security Deposit',
        deadLine: null,
        id: 3,
        isCompleted: false,
      },
      {
        task: 'Search',
        deadLine: null,
        id: 4,
        isCompleted: false,
      },
      {
        task: 'Apply',
        deadLine: null,
        id: 5,
        isCompleted: false,
      },
      {
        task: 'Lease Up',
        deadLine: null,
        id: 6,
        isCompleted: false,
      },
    ],
    educationTasks: [
      {
        task: 'Goal Settings',
        deadLine: null,
        id: 1,
        isCompleted: false,
      },
      {
        task: 'Registration',
        deadLine: null,
        id: 2,
        isCompleted: false,
      },
      {
        task: 'Assessments',
        deadLine: null,
        id: 3,
        isCompleted: false,
      },
      {
        task: 'Consultation',
        deadLine: null,
        id: 4,
        isCompleted: false,
      },
      {
        task: 'Attend Classess',
        deadLine: null,
        id: 5,
        isCompleted: false,
      },
      {
        task: 'Graduate',
        deadLine: null,
        id: 6,
        isCompleted: false,
      },
    ],
    careerTasks: [
      {
        task: 'Intake: Establish Eligibility',
        deadLine: null,
        id: 1,
        isCompleted: false,
      },
      {
        task: 'Assessments : Career Goals',
        deadLine: null,
        id: 2,
        isCompleted: false,
      },
      {
        task: 'Preparation Phase : Employee Plans',
        deadLine: null,
        id: 3,
        isCompleted: false,
      },
      {
        task: 'Job Search',
        deadLine: null,
        id: 4,
        isCompleted: false,
      },
      {
        task: 'Training',
        deadLine: null,
        id: 5,
        isCompleted: false,
      },
      {
        task: 'Securing Employment',
        deadLine: null,
        id: 6,
        isCompleted: false,
      },
    ],
    financeTasks: [
      {
        task: 'Intake',
        deadLine: null,
        id: 1,
        isCompleted: false,
      },
      {
        task: 'Credit Assessment',
        deadLine: null,
        id: 2,
        isCompleted: false,
      },
      {
        task: 'Goal Setting',
        deadLine: null,
        id: 3,
        isCompleted: false,
      },
      {
        task: 'Budget',
        deadLine: null,
        id: 4,
        isCompleted: false,
      },
      {
        task: 'Financial Asset',
        deadLine: null,
        id: 5,
        isCompleted: false,
      },
      {
        task: 'Emergency Fund',
        deadLine: null,
        id: 6,
        isCompleted: false,
      },
    ],
  };
  constructor(private afs: AngularFirestore) {}

  initAllTasks(uid) {
    return new Observable<any>((observer) => {
      const docRef = this.afs
        .collection(`users/${uid}/tasks`)
        .add(this.data)
        .then(
          (res) => {
            observer.next(res);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
    });
  }

  getAllUserTasks(uid) {
    return this.afs
    .collection(`users/${uid}/tasks`, (ref) =>
      ref.orderBy('createdDate', 'desc'))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    

  }


  updateTask(uid, taskId, data){
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`users/${uid}/tasks/${taskId}`);
      docRef.update(data).then(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }
}
