import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ProjectService} from "./services/project.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    NewProjectComponent,
    UpdateProjectComponent
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
