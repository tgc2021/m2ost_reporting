import { DatePipe } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation ,TemplateRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import * as XLSX from 'xlsx'; // Import xlsx library
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// Define the interface for periodic elements
export interface UserData {
  Userid: string;
  Name: string;
  Gender: string;
  Region: string;
  Role: string;
  Designation:string;
  City: string;
  Overall_Login_Status:string;
  // Login_Activity:String;
  Store_Type:string;
  Store_Name:string;
  StoreCode: string;
  Latest_Login:string;
  Date_of_joining:string;
  Date_Of_Creation:string;
  Status:string;
}
@Component({
  selector: 'app-login-report',
  templateUrl: './login-report.component.html',
  styleUrls: ['./login-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginReportComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content') content!: TemplateRef<any>; // Declare content template reference

  // Define displayed columns and data source for the table
  displayedColumns: string[] = ['Userid', 'Name', 'Gender','Date_of_joining','Date_Of_Creation', 'Region', 'Role', 'Designation', 'City','StoreCode','Store_Name','Store_Type','Status','Latest_Login','Overall_Login_Status'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();
  minDate: Date;
  maxDate: Date;
  startDate: Date | null;
  endDate: Date | null;

  userInfo: any;
  department: any = [];
  departmentValue = 'Select Department';
  departmentId: number = 0;
  roleValue = 'Select Role';
  daysvalue = 'Select Login Activity Status'
  roleId: number = 0;
  roles: any = [];
  selectedRoleIds: number[] = [];
  selectedValue: any[] = [];
  loginReportData: any[] = [];
  days: number[] = Array.from({ length: 28 }, (_, i) => i + 1);
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  selectedDepartmentIds: any[] = [];
  selectedDepartmentValues: any[] = [];
  form: FormGroup;
  submitted = false;
  
  message: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private http: ServiceService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      department: ['', Validators.required],
      role: ['', Validators.required],
      days: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();
    this.startDate = null;
    this.endDate = null;
  }
  ngOnInit(): void {
   this.getDepartment();
  //  this.getRoles();
  }

  getDepartment() {
    this.selectedRoleIds = [];
    this.selectedValue = [];
    this.roleValue = 'Select Role';
    const orgid = this.http.userinfo.ID_ORGANIZATION
    this.http.getDepartment(orgid).subscribe((res: any) => {
      this.department = res;
      console.log(this.department);

    })
  }
  selectDepatment(dept: any) {
    console.log(dept);
    this.departmentValue = dept.Department_name;
    this.departmentId = dept.Id_department;

  }
  // Methods for Department Select All functionality
  isDepartmentSelected(dept: any): boolean {
    return this.selectedDepartmentIds.includes(dept.Id_department);
  }

  toggleDepartmentSelection(dept: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedDepartmentIds.push(dept.Id_department);
      this.selectedDepartmentValues.push(dept.Department_name)
    } else {
      this.selectedDepartmentIds = this.selectedDepartmentIds.filter(dep => dep !== dept.Id_department);
      this.selectedDepartmentValues = this.selectedDepartmentValues.filter((dep: any) => dep !== dept.Department_name)
    }
    // console.log(this.selectedDepartmentIds);
    this.departmentValue = this.selectedDepartmentValues?.join(',') || 'Select Department';
  }
  isAllDepartmentsSelected(): boolean {
    return this.department.length > 0 && this.selectedDepartmentIds.length === this.department.length;
  }

  toggleSelectAllDepartments(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedDepartmentIds = this.department.map((dept: any) => dept.Id_department);
      this.selectedDepartmentValues = this.department.map((dept: any) => dept.Department_name);
    } else {
      this.selectedDepartmentIds = [];
      this.selectedDepartmentValues = [];
    }
    console.log(this.selectedDepartmentIds, this.selectedDepartmentValues);
    this.departmentValue = this.selectedDepartmentValues?.join(',') || 'Select Department';
  }
// New methods for getRoles All functionality
getRoles() {
  const orgid = this.http.userinfo.ID_ORGANIZATION;
  const deptid = this.selectedDepartmentIds;
  this.http.getRoleWise(orgid, deptid).subscribe((res: any) => {
    this.roles = res;
    console.log(res);
  })
}

isSelected(role: any): boolean {
  return this.selectedRoleIds.includes(role.Value);
}

toggleRoleSelection(role: any, event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const isChecked = inputElement.checked;
  if (isChecked) {
    this.selectedRoleIds.push(role.Value);
    this.selectedValue.push(role.Text);
  } else {
    this.selectedRoleIds = this.selectedRoleIds.filter(id => id !== role.Value);
    this.selectedValue = this.selectedValue.filter((text: any) => text !== role.Text);

  }
  console.log(this.selectedRoleIds, this.selectedValue);
  this.roleValue = this.selectedValue?.[0]|| 'Select Role';
}



isAllSelected(): boolean {
  return this.roles.length > 0 && this.selectedRoleIds.length === this.roles.length;
}

toggleSelectAll(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const isChecked = inputElement.checked;
  if (isChecked) {
    this.selectedRoleIds = this.roles.map((role: any) => role.Value);
    this.selectedValue = this.roles.map((role: any) => role.Text);
  } else {
    this.selectedRoleIds = [];
    this.selectedValue = [];
  }
  console.log(this.selectedRoleIds, this.selectedValue);
  this.roleValue = this.selectedValue?.[0] || 'Select Role';
}



  selectDays(days: any) {
    this.daysvalue = days;
  }


  ngAfterViewInit() {
    console.log(this.paginator);
    // Set paginator and sort after view init
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // getLoginReport() {
  //   this.logSelectedDates()
  //   const orgid = this.http.userinfo.ID_ORGANIZATION;
  //   const deptid = this.selectedDepartmentIds.join(',');
  //   const roleid = this.selectedRoleIds.join(',')
  //   const daycount = this.daysvalue != 'Select Login Activity Status' ? this.daysvalue : 0;
  //   // const roleid ="'436','438'"

  //   console.log(orgid, deptid, roleid, this.formattedStartDate, this.formattedEndDate, daycount);

  //   this.http.getLoginreport(orgid, deptid, roleid, this.formattedStartDate, this.formattedEndDate, daycount).subscribe((res: any) => {

  //     this.loginReportData = res;
  //     console.log(this.loginReportData);
  //     const transformedData = this.loginReportData.length > 0 ? this.loginReportData.map((item: any, index: any) => {
  //       return {
  //         Userid: item?.USERID != null ? item?.USERID : '-',
  //         Name: item?.NAME != null ? item?.NAME : '-',
  //         Region: item?.Region != null ? item?.Region : '-',
  //         Gender: item?.Gender != null ? item?.Gender : '-',
  //         Role: item?.Role != null ? item?.Role : '-',
  //         StoreCode: item?.Store_code != null ? item?.Store_code : '-',
  //         City: item?.City != null ? item?.City : '-',
  //       };
  //     }) : [{ Userid: '-', Name: 'No data available', Region: '-', Gender: '-', Role: '-', StoreCode: '', City: '' }];

  //     console.log(transformedData);
  //     this.dataSource.data = transformedData;
  //     console.log(this.dataSource);
  //   })
  // }

  getLoginReport() {
    this.logSelectedDates();
    const orgid = this.http.userinfo.ID_ORGANIZATION;
    const deptid = this.selectedDepartmentIds.join(',');
    const roleid = this.selectedRoleIds.join(',');
    const daycount = this.daysvalue !== 'Select Login Activity Status' ? this.daysvalue : 0;
    console.log(orgid, deptid, roleid, this.formattedStartDate, this.formattedEndDate, daycount);
    //  console.log( '123',   this.formattedStartDate !== '' &&
    //  this.formattedEndDate !== '' &&
    //  this.selectedDepartmentIds.length > 0 &&
    //  this.selectedRoleIds.length > 0 &&
    //  this.daysvalue != 'Select Login Activity Status');
     console.log(this.isFormValid());
     
     if (this.isFormValid()) {
      this.openModal('Loading data, please wait...');  
      this.http.getLoginreport(orgid, deptid, roleid, this.formattedStartDate, this.formattedEndDate, daycount)
        .subscribe({
          next: (res: any) => {
            const statusCode = res.status;
            console.log('Status Code:', statusCode);
  
            if (res != '') {
              this.loginReportData = res;
              console.log(this.loginReportData);
               console.log(this.loginReportData[0]?.Message );
               
              const transformedData = this.loginReportData.length > 0 ? this.loginReportData.map((item: any) => {

                return {
                  Userid: item?.USERID != null ? item?.USERID : '-',
                  Name: item?.NAME != null ? item?.NAME : '-',
                  Gender: item?.Gender != null ? item?.Gender : '-',
                  Date_of_joining:item?.Date_of_joining !=null ? item?.Date_of_joining:'-',
                  Date_Of_Creation:item?.Date_Of_Creation !=null ? item?.Date_Of_Creation:'-',
                  Region: item?.Region != null ? item?.Region : "No Data Found",
                  Role: item?.Role != null ? item?.Role : '-',
                  Designation:item?.Designation !=null ? item?.Designation: '',
                  City: item?.City != null ? item?.City : '-',
                  StoreCode:item?.Store_code !=null ? item?.Store_code:'-',
                  Store_Name:item?.Store_Name !=null ? item?.Store_Name:'-',
                  Store_Type:item?.Store_Type !=null ? item?.Store_Type :'-',
                  Status:item?.STATUS !=null ? item?.STATUS:'',
                  Latest_Login:item?.Latest_Login !=null ? item?.Latest_Login:'-',
                  Overall_Login_Status:item?.Overall_Login_Status !=null ?item?.Overall_Login_Status:'-',
                
                 
                };
              }) : [{ Userid: '-', Name: 'No data available', Gender: '-', Region: '-', Role: '-', Designation: '', City: '' ,Overall_Login_Status:'',Store_Type:'',Store_Name:'',StoreCode:'',Latest_Login:'',Date_of_joining:'',Date_Of_Creation:'',Status:''}];
  
              console.log(transformedData);
  
              // Bind the transformed data to the dataSource
              this.dataSource.data = transformedData;
              console.log(this.dataSource);
            
            } else {
              console.error('Error: Unexpected status code', statusCode);
              // Handle different status codes as needed
            }
          },
          error: (err) => {
            // this.closeModal()
  
            console.error('HTTP Error', err);
            // Handle error response
            if (err.status === 500) {
              this.openModal('Error: Please ensure the form is filled correctly.');  
              // window.alert('Error: Please ensure the form is filled correctly.');
            } else {
              window.alert('Network error: Please check your internet connection.');
            }
          },
          complete: () => {
            // Set loading to false when the request completes
            this.closeModal()
          }
        });
     } else {
      this.openModal('Please complete all fields in the form.');
    }
   
}

  onStartDateSelected(event: any) {
    this.startDate = event.value;
  }

  onEndDateSelected(event: any) {
    this.endDate = event.value;
  }

  getFormattedDate(date: Date | null): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') + '';
    }
    return ''; // Return an empty string if date is null
  }
  logSelectedDates() {
    if (this.startDate && this.endDate) {
      this.formattedStartDate = this.getFormattedDate(this.startDate);
      this.formattedEndDate = this.getFormattedDate(this.endDate);
      console.log('Start Date:', this.formattedStartDate);
      console.log('End Date:', this.formattedEndDate);
    }
  }
  reset() {
    window.location.reload();
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'Login_Report.xlsx');
  }

  openModal(data:any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    this.modalService.open(this.content,modalOptions); // Open modal with content template reference
     this.message=data;
}
  closeModal() {
    this.modalService.dismissAll(); 
    // this._router.navigateByUrl('login');
  }

    // Method to check if the form is valid
    isFormValid(): boolean {
      // Implement your logic to check form validity
      // Example: Check if required fields are filled
      return (
        this.formattedStartDate !== '' &&
        this.formattedEndDate !== '' &&
        this.selectedDepartmentIds.length > 0 &&
        this.selectedRoleIds.length > 0
        //  &&
        // this.daysvalue != 'Select Login Activity Status'
      );
    }
}
