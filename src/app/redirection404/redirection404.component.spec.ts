import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Redirection404Component } from './redirection404.component';

describe('Redirection404Component', () => {
  let component: Redirection404Component;
  let fixture: ComponentFixture<Redirection404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Redirection404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Redirection404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
