import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {

    if (this.authService.usuarioCorrente) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.definirForm();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  definirForm() {
    this.formLogin = this.formBuilder.group({
      nomeUsuario: this.formBuilder.control('', Validators.required),
      senha: this.formBuilder.control('', Validators.required)
    });
  }

  login() {
    if (this.formLogin.valid && this.authService.login(this.nomeUsuario.value, this.senha.value)) {
      this.router.navigate([this.returnUrl]);
    }
    else
      alert('Usuário ou senha inválidos.');
  }

  get nomeUsuario() { return this.formLogin.get('nomeUsuario'); }
  get senha() { return this.formLogin.get('senha'); }

}
