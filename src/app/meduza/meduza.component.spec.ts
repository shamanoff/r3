import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeduzaComponent } from './meduza.component';

describe('MeduzaComponent', () => {
  let component: MeduzaComponent;
  let fixture: ComponentFixture<MeduzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeduzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeduzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
