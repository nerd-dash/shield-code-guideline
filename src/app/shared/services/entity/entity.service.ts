import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntityApiServiceOptions } from '../../models';
import { Entity } from '../../models/entity.interface';
import { optionParams } from './entity.service.utils';

/** Base service responsible to abstract all CRUD operations for baseApi */
export abstract class EntityService<T extends Entity> {
  public abstract uri: string;

  constructor(protected httpClient: HttpClient) {}

  create$<R = T>(entity: Partial<T>) {
    return this.httpClient.post<R>(
      `${environment.baseApiUrl}/${this.uri}`,
      entity
    );
  }

  read$(id: number) {
    return this.httpClient.get<T>(
      `${environment.baseApiUrl}/${this.uri}/${id}`
    );
  }

  readAll$(options?: Partial<EntityApiServiceOptions>) {
    const params = optionParams(options);

    return this.httpClient.get<T[]>(`${environment.baseApiUrl}/${this.uri}`, {
      params,
      observe: 'response'
    });
  }

  update$(entity: T) {
    return this.httpClient.put<T>(
      `${environment.baseApiUrl}/${this.uri}/${entity.id}`,
      { entity }
    );
  }

  delete$(id: number) {
    return this.httpClient.delete<T>(
      `${environment.baseApiUrl}/${this.uri}/${id}`
    );
  }
}
