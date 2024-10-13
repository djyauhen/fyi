import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {MainComponent} from "./pages/main/main.component";
import {WorksComponent} from "./pages/works/works.component";
import {WorkComponent} from "./pages/work/work.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent, pathMatch: 'full'},
      {path: 'works', component: WorksComponent},
      {path: 'work/:id', component: WorkComponent}
    ]
  }
];
