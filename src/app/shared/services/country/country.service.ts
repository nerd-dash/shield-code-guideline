import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Country } from '../../models/county.interface';

@Injectable()
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get<Country[]>(`${environment.countryApi}/all`)
      .pipe(shareReplay());
  }

  getByName(name: string) {
    return this.httpClient
      .get<Country[]>(`${environment.countryApi}/name/${name}`)
      .pipe(
        map(([country]) => country),
        shareReplay()
      );
  }

  getByCode(code: string) {
    return this.httpClient
      .get<Country>(`${environment.countryApi}/alpha/${code}`)
      .pipe(
        shareReplay()
      );
  }
}
