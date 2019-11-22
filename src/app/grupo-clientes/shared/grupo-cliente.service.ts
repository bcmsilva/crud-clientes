import { Injectable } from '@angular/core';
import { GrupoCliente } from './grupo-cliente';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {

  constructor(private db: AngularFirestore) { }

  insert(grupoCliente: GrupoCliente) {
    // this.db.list('grupo-cliente').push(grupoCliente)
    //   .then((result: any) => {
    //     console.log(result.key);
    //   });
  }

  update(grupoCliente: GrupoCliente, key: string) {
    // this.db.list('grupo-cliente').update(key, grupoCliente)
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
  }

  getAll(nomeStartsWith: string, ativo: boolean) {
    return this.db.collection('grupo-cliente', ref => {

      if (nomeStartsWith)
        ref.orderBy(nomeStartsWith).startAt(nomeStartsWith).endAt(nomeStartsWith + "\uf8ff");

      if (ativo)
        ref.where('ativo', '==', ativo);

      return ref;
    })
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
        })
      );
  }

  delete(key: string) {
    //this.db.object('grupo-cliente/' + key).remove();
  }
}
