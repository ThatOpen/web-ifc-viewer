import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialTreeNodeComponent } from './spatial-tree-node.component';

describe('SpatialTreeNodeComponent', () => {
  let component: SpatialTreeNodeComponent;
  let fixture: ComponentFixture<SpatialTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpatialTreeNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
