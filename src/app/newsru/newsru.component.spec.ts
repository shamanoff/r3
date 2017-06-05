import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsruComponent } from './newsru.component';

describe('NewsruComponent', () => {
  let component: NewsruComponent;
  let fixture: ComponentFixture<NewsruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
