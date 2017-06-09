import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamoComponent } from './samo.component';

describe('SamoComponent', () => {
  let component: SamoComponent;
  let fixture: ComponentFixture<SamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
