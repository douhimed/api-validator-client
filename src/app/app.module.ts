import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ProjectService} from "./services/project.service";
import { CommonModule } from '@angular/common';
import {UpdateProjectComponent} from './components/update-project/update-project.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NewProjectComponent} from "./components/new-project/new-project.component";
import {ProjectsListComponent} from "./components/projects-list/projects-list.component";
import { ProjectTestsComponent } from './components/project-tests/project-tests.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UpdateProjectComponent,
    NewProjectComponent,
    UpdateProjectComponent,
    ProjectTestsComponent,
    ProjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
