import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  constructor(private firestore: Firestore) { }
  getStaticTasks(): Task[] {
    return [
      {
        title: 'Buy milk',
        description: 'Go to the store and buy milk'
      },
      {
        title: 'Create a Kanban app',
        description: 'Using Firebase and Angular create a Kanban app!'
      }
    ];

  }
  getTasks() {
    getDocs(collection(this.firestore, "tasks")).then((response) => {
      response.docs.forEach((doc) => {
        console.log("id: ", doc.id);
        console.log("dado: ", doc.data());
        console.log("documento: ", doc);
      });
    });

  }
  addTask(newTask: Task) { // Define an interface or type for the task data if needed
    const tasksRef = collection(this.firestore, 'tasks');
    return addDoc(tasksRef, newTask); // Add the new task document
  }
}