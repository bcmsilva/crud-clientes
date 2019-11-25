import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly endpoint: string = "cliente"

  constructor(private db: AngularFirestore) { }

  insert(grupo: Cliente) {
    this.db.collection<Cliente>(this.endpoint).add(grupo);
  }

  update(id: string, cliente: Cliente) {

    let clienteDoc = this.db.collection(this.endpoint).doc(id);
    clienteDoc.update(cliente);
  }

  delete(id: string) {
    let clienteDoc = this.db.collection(this.endpoint).doc(id);
    clienteDoc.delete();
  }

  getAll(nomeFiltro?: string, ativoFiltro?: boolean) {

    return this.db.collection(this.endpoint, ref => {

      let query: any;

      if (nomeFiltro) {
        let end = nomeFiltro.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
        query = (query || ref)
          .where('nome', '>=', nomeFiltro)
          .where('nome', '<', end);
      }

      if (ativoFiltro)
        query = (query || ref).where('ativo', '==', ativoFiltro);

      return (query || ref);
    })
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(c => <Cliente>{ id: c.payload.doc.id, ...c.payload.doc.data() });
        })
      );
  }

  get(id: string): Observable<Cliente> {
    let clienteDoc = this.db.collection(this.endpoint).doc(id);

    return new Observable((observer) => {
      clienteDoc.ref.get().then((doc) => {
        let data = doc.data();
        observer.next(<Cliente>{
          id: doc.id,
          ativo: data.ativo,
          nome: data.nome,
          tipoPessoa: data.tipoPessoa,
          cpf_cnpj: data.cpf_cnpj,
          rg_ie: data.rg_ie,
          telefone: data.telefone,
          dataCadastro: data.dataCadastro,
          idGrupo: data.idGrupo
        });
      });
    });
  }
}
