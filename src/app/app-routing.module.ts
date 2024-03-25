import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InfoDetailMotelComponent } from './components/info-detail-motel/info-detail-motel.component';
import { AdminComponent } from './components/managers/admin/admin.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/managers/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './components/managers/users/users.component';
import { MotelsComponent } from './components/managers/motels/motels.component';
import { AddMotelComponent } from './components/managers/add-motel/add-motel.component';
import { UpdateMotelComponent } from './components/managers/update-motel/update-motel.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'motel/detail/:idMotel', component: InfoDetailMotelComponent },
  {
    path: 'manager/admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'motels', component: MotelsComponent },
      { path: 'motels/add-motel', component:AddMotelComponent},
      { path: 'motels/update-motel/:idMotel', component:UpdateMotelComponent}

    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule], 
  exports: [RouterModule],
})
export class AppRoutingModule {}
