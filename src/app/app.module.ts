import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NewProjectComponent} from './components/new-project/new-project.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {ProjectService} from "./services/project.service";
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { DeleteProjectComponent } from './components/delete-project/delete-project.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
    NavbarComponent,
    UpdateProjectComponent,
    DeleteProjectComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,


  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
