import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

totalScore = 0;
healthItems = [
  {
    task: 'Health Checkup',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Nutrition / Exercise',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Dental',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Vision',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Mental Health',
    time: '04:30 PM',
    isCompleted : false
  },
];
housingItems = [
  {
    task: 'Needs Assessments',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Budget',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Security Deposit',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Search',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Apply',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Lease Up',
    time: '04:30 PM',
    isCompleted : false
  },
];
educationItems = [
  {
    task: 'Goal Settings',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Registration',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Assessments',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Consultation',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Attend Classess',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Graduate',
    time: '04:30 PM',
    isCompleted : false
  },
];
careerItems = [
  {
    task: 'Intake: Establish Eligibility',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Assessments : Career Goals',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Preparation Phase : Employee Plans',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Job Search',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Training',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Securing Employment',
    time: '04:30 PM',
    isCompleted : false
  },
];
financeItems = [
  {
    task: 'Intake',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Credit Assessment',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Goal Setting',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Budget',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Financial Asset',
    time: '04:30 PM',
    isCompleted : false
  },
  {
    task: 'Emergency Fund',
    time: '04:30 PM',
    isCompleted : false
  },
];


  constructor() { }
}
