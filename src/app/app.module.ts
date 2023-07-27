import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectTestsComponent } from './components/project-tests/project-tests.component';
import {NewProjectComponent} from './components/new-project/new-project.component';
import {ProjectService} from "./services/project.service";
import { UpdateProjectComponent } from './components/update-project/update-project.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    ProjectTestsComponent,
    NewProjectComponent,
    UpdateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
