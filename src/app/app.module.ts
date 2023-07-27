import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ProjectService} from "./services/project.service";
import {UpdateProjectComponent} from './components/update-project/update-project.component';
import {DeleteProjectComponent} from './components/delete-project/delete-project.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NewProjectComponent} from "./components/new-project/new-project.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UpdateProjectComponent,
    DeleteProjectComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
