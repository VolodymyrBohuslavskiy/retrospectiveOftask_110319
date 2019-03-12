import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) {
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/get_all_employees');
  }

  getEmployeeByName(empName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/get_employees_by_name');
  }

  saveEmployee(employee: Employee) {
    this.http.post('http://localhost:8080/save_employee', JSON.stringify(employee));
  }

  deleteEmployee(employee: Employee) {
    this.http.delete('http://localhost:8080/delete_employee_id=' + employee.empID);
  }

}
