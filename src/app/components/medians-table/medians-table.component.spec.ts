import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediansTableComponent } from './medians-table.component';

describe('MediansTableComponent', () => {
  let component: MediansTableComponent;
  let fixture: ComponentFixture<MediansTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediansTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
