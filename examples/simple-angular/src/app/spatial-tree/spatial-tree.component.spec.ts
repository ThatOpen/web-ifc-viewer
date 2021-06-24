import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialTreeComponent } from './spatial-tree.component';

describe('SpatialTreeComponent', () => {
  let component: SpatialTreeComponent;
  let fixture: ComponentFixture<SpatialTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpatialTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
