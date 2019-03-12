import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/Employee';
import {Department} from '../../models/Department';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  DepartmantArr: Department[] = [];
  EmployeeArr: Employee[] = [];
  EmployeeSearchArr: Employee[] = [];

  constructor() {
    this.DepartmantArr.push(
      new Department(1, 'DP-1'),
      new Department(2, 'DP-2'),
      new Department(3, 'DP-3'),
      new Department(4, 'DP-4')
    );

    this.EmployeeArr.push(
      new Employee(1, 'qq1', 'zz1', this.DepartmantArr[0]),
      new Employee(2, 'qq2', 'zz2', this.DepartmantArr[1]),
      new Employee(3, 'qq3', 'zz3', this.DepartmantArr[2]),
      new Employee(4, 'qq4', 'zz4', this.DepartmantArr[3]),
      new Employee(5, 'qq5', 'zz5', this.DepartmantArr[0])
    );

  }

  ngOnInit() {
  }

  addEmployee(EmployeeForm: NgForm) {
    if (EmployeeForm.valid && EmployeeForm.touched) {
      EmployeeForm.value.empActive = false;
      this.EmployeeArr.push(
        new Employee(
          EmployeeForm.value.empID,
          EmployeeForm.value.empName,
          EmployeeForm.value.empActive,
          this.DepartmantArr.find(value => value.dpID === EmployeeForm.value.department.dpID)
        )
      );
      EmployeeForm.resetForm();
    }
  }

  setInForm(oneEmployee: Employee, EmployeeForm: NgForm) {
    EmployeeForm.setValue({
      empID: oneEmployee.empID,
      empName: oneEmployee.empName,
      empActive: oneEmployee.empActive,
      department: oneEmployee.department
    });
  }

  view(onemptied: Employee) {
    console.log(onemptied);
  }

  deleteOne(oneEmployee: Employee) {
    this.EmployeeArr.splice(this.EmployeeArr.findIndex(value => value.empID === oneEmployee.empID), 1);
    setTimeout(() =>
        this.EmployeeSearchArr.splice(this.EmployeeArr.findIndex(value => value.empID === oneEmployee.empID), 1),
      2000
    )
    ;
  }

  find(searchForm: NgForm) {
    for (const employeeArrElement of this.EmployeeArr) {
      if (employeeArrElement.empName === searchForm.value.empName) {
        this.EmployeeSearchArr.push(employeeArrElement);
      }
    }
    console.log(this.EmployeeSearchArr);
  }
}
