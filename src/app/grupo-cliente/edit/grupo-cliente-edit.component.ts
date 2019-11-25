import { Component, OnInit } from '@angular/core';
import { GrupoCliente } from '../shared/grupo-cliente';
import { GrupoClienteService } from '../shared/grupo-cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupo-cliente-edit',
  templateUrl: './grupo-cliente-edit.component.html',
  styleUrls: ['./grupo-cliente-edit.component.css']
})
export class GrupoClienteEditComponent implements OnInit {
  id: string;
  carregando: boolean;
  formGrupo: FormGroup;

  constructor(
    private grupoClienteService: GrupoClienteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.definirForm();

    this.id = this.route.snapshot.params['id'];

    if (this.id)
    {
      this.carregando = true;
      this.carregarGrupo();
    }
  }

  carregarGrupo() {
    this.grupoClienteService.get(this.id).subscribe(grupo => {
      this.carregando = false;

      this.formGrupo.controls['nome'].setValue(grupo.nome);
      this.formGrupo.controls['ativo'].setValue(grupo.ativo);
    });
  }

  definirForm() {
    this.formGrupo = this.formBuilder.group({
      ativo: this.formBuilder.control(true),
      nome: this.formBuilder.control('', Validators.required)
    });
  }

  salvar() {
    if (this.formGrupo.valid) {

      let grupo = <GrupoCliente>{
        ativo: this.formGrupo.controls['ativo'].value,
        nome: this.formGrupo.controls['nome'].value
      };

      if (!this.id) 
        this.grupoClienteService.insert(grupo);
      else 
        this.grupoClienteService.update(this.id, grupo);

      this.router.navigate(['/grupo-cliente-list']);
    }
  }
}
