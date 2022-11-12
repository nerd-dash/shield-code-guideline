import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Entity } from '../models/Entity';

export interface HttpParamsOptions {
  page: number;
  limit: number;
  sort: string;
  order: `asc` | `desc`;
}

export abstract class EntityService<T extends Entity> {
  protected abstract uri: string;

  constructor(protected httpClient: HttpClient) {}

  create<R = any>(entity: T) {
    return this.httpClient.post<R>(`${environment.baseUrl}/${this.uri}`, {
      entity
    });
  }

  read(id: number) {
    return this.httpClient.get<T>(`${environment.baseUrl}/${this.uri}/${id}`);
  }

  readAll(options?: Partial<HttpParamsOptions>) {
    options = {
      page: 1,
      limit: 10,
      sort: `id`,
      order: `asc`,
      ...options
    };
    const { page, limit, order, sort } = options;
    let params = new HttpParams();
    if (page) params = params.set(`_page`, page);
    if (limit) params = params.set(`_limit`, limit);
    if (sort) params = params.set(`_sort`, sort);
    if (order) params = params.set(`_order`, order);

    return this.httpClient.get<T[]>(`${environment.baseUrl}/${this.uri}`, {
      params
    });
  }

  update(entity: T) {
    return this.httpClient.put<T>(
      `${environment.baseUrl}/${this.uri}/${entity.id}`,
      { entity }
    );
  }

  delete(id: number) {
    return this.httpClient.delete<T>(
      `${environment.baseUrl}/${this.uri}/${id}`
    );
  }
}
