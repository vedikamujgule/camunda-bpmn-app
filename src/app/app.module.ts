import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CamundaModelerComponent } from '../camunda-bpmn/camunda-modeler/camunda-modeler.component';


@NgModule({
  declarations: [
    AppComponent,
    CamundaModelerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
