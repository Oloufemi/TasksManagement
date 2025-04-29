import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {WorksModule} from './works/works.module';
import {WorksService} from './works/works.service';
import {provideHttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Work} from './works/models/work';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  const workMock: Work = {
    workContractID: 123456789,
    workManager: "John ADEKAMBI",
    workStatus: "En cours",
    workTitle: "Projet de rénovation de biens",
    workType: "Travaux"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, WorksModule],
      providers: [WorksService, provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app and initialize values', () => {
    expect(app).toBeTruthy();
    expect(app.worksList()).toEqual([]);
    expect(app.displayFormToAddWork).toEqual(false);
    expect(app.displayFormToModifyWork).toEqual(false);
    expect(app.workToModify).toEqual(undefined);
    expect(app.title).toEqual('front');
  });

  describe('ngOnInit', () => {
    it('should call getAllWorks function', () => {
      app.workService.getAllWorks = jest.fn().mockReturnValue(of([]));
      fixture.detectChanges();
      expect(app.workService.getAllWorks).toHaveBeenCalled();
    });
    it('should call getAllWorks and return right values', () => {
      app.workService.getAllWorks = jest.fn().mockReturnValue(of([{...workMock}]));
      fixture.detectChanges();
      app.workService.getAllWorks().subscribe((result: Work[]) => {
        expect(result).toEqual([{...workMock}]);
      });
      expect(app.worksList()).toEqual([{...workMock}]);
    });
  });

  describe('displayUpdateComponent', () => {
    it('should not make changes', () => {
      app.displayUpdateComponent(0);
      expect(app.displayFormToModifyWork).toBeFalsy();
      expect(app.worksList()).toEqual([]);
    });

    it('should make changes', () => {
      app.worksList.set([{...workMock,workContractID:1},{...workMock,workContractID:2}]);
      app.displayUpdateComponent(1);
      expect(app.displayFormToModifyWork).toBeTruthy();
      expect(app.workToModify).toEqual({...workMock,workContractID:1});
    });
  });

  describe('displayCreationComponent', () => {
    it('should set property to TRUE', () => {
      app.displayFormToAddWork = false;
      app.displayCreationComponent();
      expect(app.displayFormToAddWork).toBeTruthy();
    });
  });

  describe('deleteWork', () => {
    it('should not make changes', () => {
      app.workService.deleteWork = jest.fn();
      app.deleteWork(0);
      expect(app.workService.deleteWork).not.toHaveBeenCalled();
    });

    it('should delete work', () => {
      app.workService.deleteWork = jest.fn().mockReturnValue(of({}));
      app.worksList.set([{...workMock,workContractID:1},{...workMock,workContractID:2}])
      app.deleteWork(1);
      app.workService.deleteWork(1).subscribe(() => {
      expect(app.worksList()).toEqual([{...workMock,workContractID:2}]);
      });
    });
  });

  describe('addingWorkToList', () => {
    it('should add a task', () => {
      app.displayFormToAddWork = true;
      app.worksList.set([]);
      app.workService.addWork = jest.fn().mockReturnValue(of({}));
      app.addingWorkToList({...workMock});
      expect(app.displayFormToAddWork).toBeFalsy();
      expect(app.workService.addWork).toHaveBeenCalled();
      expect(app.worksList()).toEqual([{...workMock}]);
    });
  });

  describe('executeWorkModification', () => {
    it('should modify a task', () => {
      app.displayFormToModifyWork = true;
      app.worksList.set([{...workMock}]);
      app.workService.updateAWork = jest.fn().mockReturnValue(of({}));
      app.executeWorkModification({...workMock,workManager:'alex'});
      expect(app.displayFormToModifyWork).toBeFalsy();
      expect(app.workService.updateAWork).toHaveBeenCalled();
      expect(app.worksList()[0]).toEqual({...workMock,workManager:'alex'});
    });
  });
});
