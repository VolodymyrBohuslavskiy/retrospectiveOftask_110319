import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  otherMagicDepartments: Department[] = [];


  constructor(public http: HttpClient) {
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>('http://localhost:8080/get_all_departments');
  }

  setDepartments() {
    this.otherMagicDepartments.push(
      new Department(1, 'HR'),
      new Department(2, 'Tech'),
      new Department(3, 'Finance'),
      new Department(4, 'Freelance'));
    this.http.post('http://localhost:8080/set_magic_departments', JSON.stringify(this.otherMagicDepartments)).subscribe();
  }
}
