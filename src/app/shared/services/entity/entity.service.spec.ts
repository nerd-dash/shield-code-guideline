import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Entity, EntityApiServiceOptions } from '../../models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntityService } from './entity.service';
import { optionParams } from './entity.service.utils';

interface Foo extends Entity {
  foo: string;
}

@Injectable()
class TestEntityService extends EntityService<Foo> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  uri = 'entity';
}

describe('EntityService', () => {
  let service: EntityService<Entity>;
  let httpTestingController: HttpTestingController;

  const id = 666;
  const notPersisted: Partial<Foo> = { foo: 'bar' };
  const entity: Entity = { ...notPersisted, id };
  const error = new ErrorEvent('test error');

  let spiedOptionParams : jest.Spied<typeof optionParams> | undefined = undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: EntityService, useClass: TestEntityService }]
    }).compileComponents();

    service = TestBed.inject(EntityService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it(`should on success :
          - make a POST request to the uri
          - pass a the argument to the body of the request
          - return an entity persisted value to the stream
      `, () => {
      service
        .create$(notPersisted)
        .subscribe((foo) => expect(foo).toBe(entity));

      const req: TestRequest = httpTestingController.expectOne(
        `${environment.baseApiUrl}/${service.uri}`
      );

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toBe(notPersisted);

      req.flush(entity);
    });

    it(`should on failure :
          - make a POST request to the uri
          - pass a the argument to the body of the request
          - return an error when server errors
      `, () => {
      service.create$(notPersisted).subscribe({
        error: (err) => expect(err).toEqual(error)
      });

      const req: TestRequest = httpTestingController.expectOne(
        `${environment.baseApiUrl}/${service.uri}`
      );

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toBe(notPersisted);

      req.error(error, { status: 500 });
    });
  });

  describe('read$', () => {
    it(`should on success :
          - make a GET request to the uri
          - pass nothing to the body of the request
          - return an entity persisted value to the stream
      `, () => {
      service.read$(id).subscribe((foo) => expect(foo).toBe(entity));

      const req: TestRequest = httpTestingController.expectOne(
        `${environment.baseApiUrl}/${service.uri}/${id}`
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();

      req.flush(entity);
    });

    it(`should on failure :
          - make a GET request to the uri
          - pass nothing to the body of the request
          - return an error when server errors
      `, () => {
      service.read$(id).subscribe({
        error: (err) => expect(err).toEqual(error)
      });

      const req: TestRequest = httpTestingController.expectOne(
        `${environment.baseApiUrl}/${service.uri}/${id}`
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();

      req.error(error, { status: 500 });
    });
  });
});
