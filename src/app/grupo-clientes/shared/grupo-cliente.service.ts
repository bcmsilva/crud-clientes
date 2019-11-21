import { Injectable } from '@angular/core';
import { GrupoCliente } from './grupo-cliente';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {

  constructor(private db: AngularFireDatabase) { }

  insert(grupoCliente: GrupoCliente) {
    this.db.list('grupo-cliente').push(grupoCliente)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(grupoCliente: GrupoCliente, key: string) { 
    this.db.list('grupo-cliente').update(key, grupoCliente)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAll() { 
    return this.db.list('grupo-cliente')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) { 
    this.db.object('grupo-cliente/' + key).remove();
  }
}
