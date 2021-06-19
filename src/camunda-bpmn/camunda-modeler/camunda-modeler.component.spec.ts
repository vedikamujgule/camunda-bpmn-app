import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamundaModelerComponent } from './camunda-modeler.component';

describe('CamundaModelerComponent', () => {
  let component: CamundaModelerComponent;
  let fixture: ComponentFixture<CamundaModelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamundaModelerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamundaModelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
