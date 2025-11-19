import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fighting } from './fighting';

describe('Fighting', () => {
  let component: Fighting;
  let fixture: ComponentFixture<Fighting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fighting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fighting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
