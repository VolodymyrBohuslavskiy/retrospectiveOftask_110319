import {Department} from './Department';

export class Employee {

  constructor(
    public empID?: number,
    public empName?: string,
    public empActive?: string,
    public department?: Department
  ) {
  }
}
