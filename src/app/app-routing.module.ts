import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewProjectComponent} from "./new-project/new-project.component";

const routes: Routes = [
  {path: "new-project", component: NewProjectComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
