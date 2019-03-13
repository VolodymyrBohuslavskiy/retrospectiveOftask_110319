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
    // this.departmentService.setDepartments(); // Automatic add departments
    this.departmentService.getAllDepartments().subscribe(departments => this.DepartmantArr = departments);
    this.employeeService.getAllEmployees().subscribe(employees => this.EmployeeArr = employees);
  }

  addEmployee(EmployeeForm: NgForm) {
    if (EmployeeForm.valid && EmployeeForm.touched) {
      this.employeeService.saveEmployee(new Employee(null, EmployeeForm.value.empName,
        EmployeeForm.value.empActive,
        this.DepartmantArr.find(value => value.dpID === EmployeeForm.value.department.dpID)));
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
    this.employeeService.deleteEmployee(oneEmployee);
  }

  find(searchForm: NgForm) {
    this.employeeService.getEmployeeByName(searchForm.value.empName).subscribe(employeesByName => this.EmployeeSearchArr = employeesByName);
  }
}
