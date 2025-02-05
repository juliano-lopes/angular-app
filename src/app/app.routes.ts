import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { SuppliersNewComponent } from './suppliers/suppliers-new/suppliers-new.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/AuthGuard.service';

export const routes: Routes = [
    { path: 'categories', component: CategoriesComponent },
    {path: 'login', component: LoginComponent},
    { path: '', component: DashboardComponent },
    { path: 'tasks', component: TasklistComponent },
    {
        path: 'suppliers', component: SuppliersComponent,
        children: [{ path: '', component: SuppliersListComponent }, { path: 'new', component: SuppliersNewComponent }]
    }
];
