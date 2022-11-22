import { HttpParams } from '@angular/common/http';
import { EntityApiServiceOptions } from '../../models';

export const optionParams = (options?: Partial<EntityApiServiceOptions>) => {
  options = {
    page: 1,
    limit: 10,
    sort: `id`,
    order: `asc`,
    query: '',
    ...options
  };
  const { page, limit, order, sort, query } = options;
  let params = new HttpParams();
  if (page) params = params.set(`_page`, page);
  if (limit) params = params.set(`_limit`, limit);
  if (sort) params = params.set(`_sort`, sort);
  if (order) params = params.set(`_order`, order);
  if (query) params = params.set(`q`, query);
  return params;
};
