import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/Employee';
import {Department} from '../../models/Department';
import {NgForm} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  DepartmantArr: Department[] = [];
  EmployeeArr: Employee[] = [];
  EmployeeSearchArr: Employee[] = [];

  constructor(public employeeService: EmployeeService,
              public departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentService.setDepartments();
    this.departmentService.getAllDepartments().subscribe(departments => this.DepartmantArr = departments);
    this.employeeService.getAllEmployees().subscribe(employees => this.EmployeeArr = employees);
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
