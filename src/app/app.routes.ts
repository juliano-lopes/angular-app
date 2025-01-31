import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasklistComponent } from './tasklist/tasklist.component';

export const routes: Routes = [
    { path: 'categories', component: CategoriesComponent },
    { path: '', component: DashboardComponent },
    { path: 'tasks', component: TasklistComponent}
];
