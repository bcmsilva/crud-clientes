import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    private usuarioCorrenteSubject: BehaviorSubject<Usuario>;
    public usuarioCorrente: Observable<Usuario>;

    constructor() {
        this.usuarioCorrenteSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.usuarioCorrente = this.usuarioCorrenteSubject.asObservable();
    }

    public get usuarioCorrenteValue(): Usuario {
        return this.usuarioCorrenteSubject.value;
    }

    login(nomeUsuario: string, senha: string) : boolean {

        let usuario = <Usuario>{ nomeUsuario: 'admin', senha: 'senha123' };

        if (usuario.nomeUsuario == nomeUsuario && usuario.senha == senha) {
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            this.usuarioCorrenteSubject.next(usuario);

            return true;
        }

        return false;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.usuarioCorrenteSubject.next(null);
    }
}