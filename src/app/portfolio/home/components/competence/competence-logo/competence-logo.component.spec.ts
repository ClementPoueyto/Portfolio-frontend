import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceLogoComponent } from './competence-logo.component';

describe('CompetenceLogoComponent', () => {
  let component: CompetenceLogoComponent;
  let fixture: ComponentFixture<CompetenceLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenceLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
