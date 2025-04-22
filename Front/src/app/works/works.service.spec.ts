import { TestBed } from '@angular/core/testing';
import { WorksService } from './works.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {Work} from './models/work';
import {workMock} from './core/mocks';
import {firstValueFrom} from 'rxjs';

describe('WorksService', () => {
  let service: WorksService;
  let httpTesting:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        WorksService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WorksService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllWorks', () => {
    it('should get a list of works', () => {
      service.getAllWorks().subscribe((result:Work[]) => {
        expect(result).toEqual([{...workMock}]);
      });
      const req = httpTesting.expectOne('http://localhost:4200/works');
      expect(req.request.method).toBe('GET');
      expect(req.cancelled).toBeFalsy();
      req.flush([{...workMock}]);
    });
  });

  describe('addWork', () => {
    it('should add a specified work', () => {
      // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request, and creates a `Promise` of the response.
      firstValueFrom( service.addWork({...workMock}));
      const req = httpTesting.expectOne('http://localhost:4200/works');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({...workMock});
      expect(req.cancelled).toBeFalsy();
    });
  });

  describe('updateAWork', () => {
    it('should update a specified work', () => {
      // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request, and creates a `Promise` of the response.
      firstValueFrom( service.updateAWork({...workMock}));
      const req = httpTesting.expectOne('http://localhost:4200/works/123456789');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({...workMock});
      expect(req.cancelled).toBeFalsy();
    });
  });

  describe('deleteWork', () => {
    it('should delete a specified work', () => {
      // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request, and creates a `Promise` of the response.
      firstValueFrom( service.deleteWork(workMock.workContractID));
      const req = httpTesting.expectOne('http://localhost:4200/works/123456789');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toBeFalsy();
      expect(req.cancelled).toBeFalsy();
    });
  });
});
