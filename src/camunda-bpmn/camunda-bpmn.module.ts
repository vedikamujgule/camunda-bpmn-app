import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CamundaModelerComponent } from '../camunda-bpmn/camunda-modeler/camunda-modeler.component';
import { StepEditorComponent } from './step-editor/step-editor.component';
import { RouterModule, Routes } from '@angular/router';
declare var require: any;
const $: any = require('jquery');

@NgModule({
  declarations: [StepEditorComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: 'StepEditor', component: StepEditorComponent }])
  ],
  providers: [],
  bootstrap: [CamundaModelerComponent]
})
export class CamundaBPMNModule { }
