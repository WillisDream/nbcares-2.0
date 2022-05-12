# nbcares-2.0
Nb cares App Final Delivery 
After downloading ionic node js, and cardova. You should be able to run the app with no issues 
// Main functions running the apps point system:
-> When a task is completed, the firebase collections users/${uid}/tasks/${taskId} is updated and marked as complete, and the variable points in the firebase collection is updated (100 points added to the points)

->The users data are saved in the localstorage, and everytime when a user visits a page user datas are refreshed using ionViewWillEnter() hook.

-> LocalStorage is updated everytime when a change is there in the firebase document as it's listening for the changes in the logged users document in listenToUser() function in auth.service

-> Function to update task (complete / edit) is in task.service.ts updateTask() function

Firebase Credentials will be under services folder.
