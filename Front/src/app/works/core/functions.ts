import {ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export function getDebugElementByDataRole(fixture:ComponentFixture<any>, dataRole:string):DebugElement {
  return fixture.debugElement.query(By.css(`[data-role="${dataRole}"]`));
}
