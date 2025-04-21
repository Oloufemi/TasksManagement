import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkCardComponent } from './work-card.component';
import {Work} from '../../models/work';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {getDebugElementByDataRole} from '../../core/functions';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatMenuHarness} from '@angular/material/menu/testing';

describe('WorkCardComponent', () => {
  let component: WorkCardComponent;
  let fixture: ComponentFixture<WorkCardComponent>;
  let loader: HarnessLoader;
  const workMock: Work = {
    workContractID: 123456789,
    workManager: "John ADEKAMBI",
    workStatus: "En cours",
    workTitle: "Projet de rénovation de biens",
    workType: "Travaux"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatIconButton,
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        MatMenuItem,],
      declarations:[WorkCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardComponent);
    component = fixture.componentInstance;
    component.work = {...workMock};
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const workTitle:DebugElement = getDebugElementByDataRole(fixture,'work-title');
    const workType:DebugElement = getDebugElementByDataRole(fixture,'work-type');
    const workManager:DebugElement = getDebugElementByDataRole(fixture,'work-manager');
    const workStatus:DebugElement = getDebugElementByDataRole(fixture,'work-status');
    const workContract:DebugElement = getDebugElementByDataRole(fixture,'work-contractID');
    expect(component).toBeTruthy();
    expect(workTitle.nativeElement.textContent).toEqual(workMock.workTitle);
    expect(workType.nativeElement.textContent).toEqual(workMock.workType);
    expect(workManager.nativeElement.textContent).toEqual(workMock.workManager);
    expect(workStatus.nativeElement.textContent).toEqual(workMock.workStatus);
    expect(workContract.nativeElement.textContent).toEqual(workMock.workContractID.toString());
    expect(component.work).toEqual({...workMock});
  });

  describe('updateWork', () => {
    it('should emit the ID in case of update', () => {
      component.workToUpdateContractID.emit = jest.fn();
      component.workToDeleteContractID.emit = jest.fn();
      component.updateWork();
      expect(component.workToUpdateContractID.emit).toHaveBeenCalled();
      expect(component.workToDeleteContractID.emit).not.toHaveBeenCalled();
    });
    it('should emit the ID after a user click', async () => {
      component.workToUpdateContractID.emit = jest.fn();
      let menuList:MatMenuHarness[] = await loader.getAllHarnesses(MatMenuHarness);
      let menu:MatMenuHarness = await menuList[0];
      expect(await menu.isOpen()).toBeFalsy();
      await menu.open();
      expect(await menu.isOpen()).toBeTruthy();
      await menu.clickItem({text: /Modifier/});
      expect(component.workToUpdateContractID.emit).toHaveBeenCalled();
    });
  });

  describe('deleteItem', () => {
    it('should emit the ID ', () => {
      component.workToDeleteContractID.emit = jest.fn().mockReturnValue(workMock.workContractID);
      component.deleteItem();
      expect(component.workToDeleteContractID.emit).toHaveBeenCalled();
    });
    /*it('should emit the ID on the click on button', () => {

    });*/
  });
});
