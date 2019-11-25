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

    this.grupoDoc = this.db.doc<GrupoCliente>('${endpoint}/${id}');
    this.grupoDoc.update(grupo);
  }

  delete(id: string) {
    this.grupoDoc = this.db.doc<GrupoCliente>('${endpoint}/${id}');
    this.grupoDoc.delete();
  }

  getAll() {
    return this.db.collection(this.endpoint, ref => {

      // if (nomeStartsWith)
      //   ref.orderBy(nomeStartsWith).startAt(nomeStartsWith).endAt(nomeStartsWith + "\uf8ff");

      // if (ativo)
      //   ref.where('ativo', '==', ativo);

      return ref;
    })
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(c => <GrupoCliente>{ id: c.payload.doc.id, ...c.payload.doc.data() });
        })
      );
  }

  get(id: string) : Observable<GrupoCliente> {
    this.grupoDoc = this.db.doc<GrupoCliente>('${endpoint}/${id}');

    return new Observable((observer) => {
      this.db.collection(this.endpoint).doc(id).ref.get().then((doc) => {
        let data = doc.data();
        observer.next(<GrupoCliente>{
          id: doc.id,
          ativo: data.ativo,
          nome: data.nomes
        });
      });
    });
  }
}
