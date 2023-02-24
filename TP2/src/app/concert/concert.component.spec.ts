import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertComponent } from './concert.component';

describe('ConcertComponent', () => {
  let component: ConcertComponent;
  let fixture: ComponentFixture<ConcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
