import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) =>{
        this.employees = response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
  public onAddEmployee(addForm:NgForm){
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) =>{
        this.getEmployees();
        addForm.reset();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    )

  }
  public onUpdateEmployee(employee:Employee){
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) =>{
        this.getEmployees();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    )

  }
  public onDeleteEmployee(employeeId:number){
    console.log(employeeId)
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response:void) =>{
        this.getEmployees();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    )

  }

  public onOpenModal (employee:Employee | null,mode:string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if (mode === "edit" && employee){
      this.editEmployee = employee;
      button.setAttribute('data-target','#edit_employee_modal');
    }
    if (mode === "delete" && employee){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#delete_employee_modal');
    }
    container?.appendChild(button);
    button.click();
  }
}
