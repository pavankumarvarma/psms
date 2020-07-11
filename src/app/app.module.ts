import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { StudentComponent } from './student/student.component';
import { DashComponent } from './dash/dash.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AddstudentComponent } from './student/addstudent/addstudent.component';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { StudentService } from './student.service';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { MasterComponent } from './master/master.component';
import { MappingsComponent } from './acadamicyear/mappings/mappings.component';


const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'addStudent', component: AddstudentComponent },
  { path: 'teachers', component: TeacherComponent },
  { path: 'addteacher', component: AddTeacherComponent },
  { path: 'masters', component: MasterComponent },
  { path: 'aymappings', component: MappingsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    DashComponent,
    NavComponent,
    AddstudentComponent,
    TeacherComponent,
    AddTeacherComponent,
    MasterComponent,
    MappingsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
