import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoClientesListComponent } from './grupo-clientes-list.component';

describe('GrupoClientesListComponent', () => {
  let component: GrupoClientesListComponent;
  let fixture: ComponentFixture<GrupoClientesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoClientesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoClientesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
