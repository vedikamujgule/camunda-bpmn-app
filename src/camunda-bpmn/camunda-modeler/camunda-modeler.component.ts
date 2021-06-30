import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.development.js';
import * as camundaModdlePackage from 'camunda-bpmn-moddle/resources/camunda.json';

import { InjectionNames, EntryFactory, BpmnModeler, PropertiesPanelModule, CamundaModdleDescriptor, ElementTemplates, CamundaPropertiesProvider, OriginalPaletteProvider, camundaModdleExtension , _TokenSimulationModule} from "../../app/bpmn-js/bpmn-js";
declare var require: any;
const $: any = require('jquery');


@Component({
  selector: 'app-camunda-modeler',
  templateUrl: './camunda-modeler.component.html',
  styleUrls: ['./camunda-modeler.component.css']
})
export class CamundaModelerComponent implements OnInit {

    title = 'Camunda BPMN Modler';
    modeler;
    display = false;
    overlayHtml: any;
    overlays: any;
    BpmnJS: any;

  constructor(private http: HttpClient, private router: Router) {
    this.BpmnJS = new BpmnJS();
  }

  ngOnInit(): void {
    this.load()
    this.modeler = new BpmnModeler({
      container: '#canvas',
      width: '100vw',
      height: '100vh',
      additionalModules: [
        { [InjectionNames.elementTemplates]: ['type', ElementTemplates.elementTemplates[1]] },
        // { [InjectionNames.propertiesProvider]: ['type', CamundaPropertiesProvider.propertiesProvider[1]] },
        { [InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider] },
        camundaModdleExtension,
        PropertiesPanelModule,
        camundaModdlePackage,
        _TokenSimulationModule
      ],
      propertiesPanel: {
        // parent: '#properties'
      },
      moddleExtensions: {
        camunda: CamundaModdleDescriptor
      },
      bpmnRenderer: {
        defaultFillColor: '#3336',
        defaultStrokeColor: '#000 '
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    } 
  }
  createNew() {
    const url = '../assets/bpmn/initial.bpmn';
    this.http.get(url, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      async (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        const result = await this.modeler.importXML(x);
        const { warnings } = result;
        console.log(warnings);
      },
      this.handleError
    );
  }

  displayPopup() {
    console.log("displayPopup called");
    this.display = true;
  }

  //fucntion to load bpmn present in assets
  load() {
    const router = this.router;
    const url = '../assets/bpmn/saveBuildingEntity.bpmn';
    this.http.get(url, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      async (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        const result = await this.modeler.importXML(x);

        this.overlays = this.modeler.get('overlays');

        const endEventNode = document.querySelector('[data-element-id=END_EVENT]');
        // attach the overlayHtml to a node
        this.overlays.add('END_EVENT', {
          position: {
            bottom: 0,
            right: 0,
            left: 0,
            top: 0
          },
          html: this.overlayHtml
        });


        // endEventNode.addEventListener('click', function(e) {
        //   overlays.add('END_EVENT', {
        //     position: {
        //       bottom: 100,
        //       right: 100,
        //       top: 100,
        //       left: 100
        //     },
        //     html: '<label for="fname">First name:</label><br> <input type="text" id="fname" name="fname" value="John"><br><label for="lname">Last name:</label><br><input type="text" id="lname" name="lname" value="Doe"><br><br> <button onclick="myFunction()">Click me</button> <script>  myFunction(){console.log("called methoad to remove overlay")}</script>'
        //   });
        // });

        // remove by element and/or type
        this.overlays.remove({ element: 'SCAN_OK' });

        // var eventBus = this.modeler.get('eventBus');

        // var events = [
        //   'element.hover',
        //   'element.out',
        //   'element.click',
        //   'element.dblclick',
        //   'element.mousedown',
        //   'element.mouseup'
        // ]; 
        // events.forEach(function(event) { 
        //   eventBus.on(event, function(e) {
        //     console.log(event, 'on', e.element.id);
        //   });
        // });



        const { warnings } = result;
        console.log(warnings);
      },
      this.handleError
    );
    this.overlayHtml = $(`<img src="../assets/edit.jpg" style="width: 30px; height: 30px;" alt="edit" onclick="alert('click event occured')">`);

    this.overlayHtml.click(function (e) {
      this.display = !this.display;
      router.navigate(['StepEditor'])
      console.log("display flag", this.display); 
      // (click)="openModal('custom-modal-1')
    });
  }


  async saveBpmn() {
    try {
      var downloadLink = $('#js-download-diagram');
      const { xml } = await this.modeler.saveXML({ format: true });
      this.setEncoded(downloadLink, 'diagram.bpmn', xml);
    } catch (err) {

      console.error('Error happened saving XML: ', err);
      this.setEncoded(downloadLink, 'diagram.bpmn', null);
    }
  }

  // async saveSvg() {
  //   try {
  //     var downloadSvgLink = $('#js-download-svg');
  //   const { svg } = await this.modeler.saveSVG();
  //   this.setEncoded(downloadSvgLink, 'diagram.svg', svg);
  // } catch (err) {

  //   console.error('Error happened saving svg: ', err);
  //   this.setEncoded(downloadSvgLink, 'diagram.svg', null);
  // }
  // }

  setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);
    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  // component method
  public zoomIn() {
    this.BpmnJS.get('zoomScroll').stepZoom(1);
  }
}

