import { Injectable } from '@angular/core';
import { GrupoCliente } from './grupo-cliente';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {

  private readonly endpoint: string = "grupo-cliente"

  private grupos: AngularFirestoreCollection<GrupoCliente>;
  private grupoDoc: AngularFirestoreDocument<GrupoCliente>;

  constructor(private db: AngularFirestore) {
    this.grupos = db.collection<GrupoCliente>(this.endpoint);
  }

  insert(grupo: GrupoCliente) {
    this.grupos.add(grupo);
  }

  update(id: string, grupo: GrupoCliente) {

    this.grupoDoc = this.db.collection(this.endpoint).doc(id);
    this.grupoDoc.update(grupo);
  }

  delete(id: string) {
    this.grupoDoc = this.db.collection(this.endpoint).doc(id);
    this.grupoDoc.delete();
  }

  getAll(nomeFiltro?: string, ativoFiltro?: boolean, orderBy?: string) {

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

      if (orderBy)
        query = (query || ref).orderBy(orderBy);

      return (query || ref);
    })
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(c => <GrupoCliente>{ id: c.payload.doc.id, ...c.payload.doc.data() });
        })
      );
  }

  get(id: string): Observable<GrupoCliente> {
    this.grupoDoc = this.db.collection(this.endpoint).doc(id);

    return new Observable((observer) => {
      this.grupoDoc.ref.get().then((doc) => {
        let data = doc.data();
        observer.next(<GrupoCliente>{
          id: doc.id,
          ativo: data.ativo,
          nome: data.nome
        });
      });
    });
  }
}