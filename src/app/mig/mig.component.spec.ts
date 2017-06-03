import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigComponent } from './mig.component';

describe('MigComponent', () => {
  let component: MigComponent;
  let fixture: ComponentFixture<MigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
