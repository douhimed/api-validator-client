import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectTestsComponent } from './components/project-tests/project-tests.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    ProjectTestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
