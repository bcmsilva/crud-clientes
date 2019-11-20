import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoClientesEditComponent } from './grupo-clientes-edit.component';

describe('GrupoClientesComponent', () => {
  let component: GrupoClientesEditComponent;
  let fixture: ComponentFixture<GrupoClientesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoClientesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoClientesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
