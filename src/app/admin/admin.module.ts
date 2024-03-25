import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../components/managers/admin/admin.component';
import { DashboardComponent } from '../components/managers/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { UsersComponent } from '../components/managers/users/users.component';
import { MotelsComponent } from '../components/managers/motels/motels.component';
import { AddMotelComponent } from '../components/managers/add-motel/add-motel.component';
import { UpdateMotelComponent } from '../components/managers/update-motel/update-motel.component';


const adminRoutes: Routes = [
  {
    path: 'manager/admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'motels', component: MotelsComponent},
      { path: 'motels/add-motel', component: AddMotelComponent},
      { path: 'motels/update-motel/:idMotel', component: UpdateMotelComponent},


    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
  declarations: [DashboardComponent],
  exports: [RouterModule],
})
export class AdminModule {}
