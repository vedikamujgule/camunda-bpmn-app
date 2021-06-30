import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CamundaModelerComponent } from '../camunda-bpmn/camunda-modeler/camunda-modeler.component';
import { RouterModule, Routes } from '@angular/router';
import { StepEditorComponent } from 'src/camunda-bpmn/step-editor/step-editor.component';
const appRoutes: Routes = [
  {
      path: 'StepEditor',
      component: StepEditorComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    CamundaModelerComponent,
    StepEditorComponent
  ],
  imports: [ 
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
