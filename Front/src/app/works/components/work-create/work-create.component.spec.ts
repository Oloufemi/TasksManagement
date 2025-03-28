import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkCreateComponent} from './work-create.component';
import {WorksModule} from '../../works.module';
import {Work} from '../../models/work';

describe('WorkCreateComponent', () => {
  let component: WorkCreateComponent;
  let fixture: ComponentFixture<WorkCreateComponent>;
  const workMock: Work = {
    workContractID: 123456789,
    workManager: "John ADEKAMBI",
    workStatus: "En cours",
    workTitle: "Projet de rénovation de biens",
    workType: "Travaux"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksModule],
      declarations: [WorkCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WorkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    /*describe('ngOnInit', () => {
      it('should initialize ', () => {
        const formStatus:FormControlStatus = {} as FormControlStatus;
        component.workForm.statusChanges = jest.fn().mockReturnValue(of(formStatus));
        component.deleteItem();
        expect(component.workToDeleteContractID.emit).toHaveBeenCalled();
      });
    });*/

  describe('createWork', () => {
    it('should NOT emit a Work', () => {
      component.addingWork.emit = jest.fn();
      component.createWork(false);
      expect(component.addingWork.emit).toHaveBeenCalledWith(undefined);
    });
    it('should emit a Work information', () => {
      component.addingWork.emit = jest.fn();
      component.workForm.controls['workContractID'].setValue(123456789);
      component.workForm.controls['workTitle'].setValue("Projet de rénovation de biens");
      component.workForm.controls['workType'].setValue("Travaux");
      component.workForm.controls['workStatus'].setValue("En cours");
      component.workForm.controls['workManager'].setValue("John ADEKAMBI");
      component.createWork(true);
      expect(component.addingWork.emit).toHaveBeenCalledWith({...workMock});
    });
  });
});
