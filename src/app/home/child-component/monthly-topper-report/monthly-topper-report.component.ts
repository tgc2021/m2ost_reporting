import { DatePipe } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import * as XLSX from 'xlsx'; // Import xlsx library


export interface UserData {
  Userid: number;
  FirstName: string;
  Region: string;
  Gender: string;
  Role: string;
  StoreCode: number;
  City: string;
}
@Component({
  selector: 'app-monthly-topper-report',
  templateUrl: './monthly-topper-report.component.html',
  styleUrls: ['./monthly-topper-report.component.scss']
})
export class MonthlyTopperReportComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Define displayed columns and data source for the table
  displayedColumns: string[] = ['Userid', 'FirstName', 'Region', 'Gender', 'Role', 'StoreCode', 'City'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();
  userInfo: any;
  department: any = [];
  departmentValue = 'Select Department';
  departmentId: number = 0;
  roleValue = 'Select Role';
  monthvalue = 'Select Month';
  monthId = '';
  assessmentValue = 'Select Assessment'
  roleId: number = 0;
  roles: any = [];
  selectedRoleIds: number[] = [];
  selectedValue: any[] = [];
  loginReportData: any[] = [];
  selectedDepartmentIds: any[] = [];
  selectedDepartmentValues: any[] = [];
  selectedAssessmentIds: any[] = [];
  selectedAssessmentValues: any[] = [];

  // Static months array
  months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];

  formattedStartDate: string = '';
  formattedEndDate: string = '';
  regionList: any = [];
  assessmentList: any = [];
  assessmentid: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private http: ServiceService,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {

  }

   // New methods for getDepartment All functionality

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
      this.selectedDepartmentIds = this.selectedDepartmentIds.filter(id => id !== dept.Id_department);
      this.selectedDepartmentValues=this.selectedDepartmentValues.filter((dept:any)=>dept !== dept.Department_name)
    }
    console.log(this.selectedDepartmentIds);
    this.departmentValue = this.selectedDepartmentValues?.[0];
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
      this.selectedDepartmentValues=[];
    }
    console.log(this.selectedDepartmentIds,this.selectedDepartmentValues);
    this.departmentValue = this.selectedDepartmentValues?.[0] ||'Select Department';
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
    this.roleValue = this.selectedValue?.[0];
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



  // Methods for assessment Select All functionality

  getAssessmentlist() {
    const orgId = this.http.userinfo?.ID_ORGANIZATION;
    this.http.getAssessmentlist(orgId).subscribe((res: any) => {
      this.assessmentList = res;
    })
  }
  selectAssessment(data: any) {
    this.assessmentValue = data.Assessment_title;
    this.assessmentid = data.Id_assessment;
  }

  isAssessmentSelected(assessment: any): boolean {
    return this.selectedAssessmentIds.includes(assessment.Id_assessment);
  }

  toggleAssessmentSelection(assessment: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedAssessmentIds.push(assessment.Id_assessment);
      this.selectedAssessmentValues.push(assessment.Assessment_title);
    } else {
      this.selectedAssessmentIds = this.selectedAssessmentIds?.filter(id => id !== assessment.Id_assessment);
      this.selectedAssessmentValues = this.selectedAssessmentValues?.filter(name => name !== assessment.Assessment_title);
    }
    console.log(this.selectedAssessmentIds);
    this.assessmentValue = this.selectedAssessmentValues?.[0] ||'Select Assessment';

  }

  isAllAssessmentsSelected(): boolean {
    return this.assessmentList.length > 0 && this.selectedAssessmentIds.length === this.assessmentList.length;
  }

  toggleSelectAllAssessments(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedAssessmentIds = this.assessmentList.map((ass: any) => ass.Id_assessment);
      this.selectedAssessmentValues=this.assessmentList.map((ass:any)=>ass.Assessment_title);
    } else {
      this.selectedAssessmentIds = [];
      this.selectedAssessmentValues=[];
    }
    console.log(this.selectedAssessmentIds);
    this.assessmentValue = this.selectedAssessmentValues?.[0] ||'Select Assessment';
  }

  selectMonth(month: any) {
    this.monthvalue = month.name;
    this.monthId = month.id;
  }

  // Methods for getRegionlist Select All functionality
  getRegionlist() {
    const orgId = this.http.userinfo?.ID_ORGANIZATION;
    this.http.getRegionlist(orgId).subscribe((res: any) => {
      this.regionList = res;
    })
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

  getMonthlyTopper() {
    // var tempurl = `${this.URLstring}` + `MonthlyTopper?orgid=${orgid}&month=${month}&id_assessment=${id_assessment}&roleId=${roleId}&region=${region}`;

    const orgid = this.http.userinfo?.ID_ORGANIZATION;
    const deptid = this.departmentId;
    const roleid = this.selectedRoleIds?.join(',')
    const monthcount = this.monthId != '' ? this.monthId : '0';
    // const roleid ="'436','438'"

    console.log(orgid, deptid, roleid);

    this.http.getLoginreport(orgid, deptid, roleid, this.formattedStartDate, this.formattedEndDate, monthcount).subscribe((res: any) => {
      this.loginReportData = res;
      console.log(this.loginReportData);

      const transformedData = this.loginReportData?.length > 0 ? this.loginReportData?.map((item: any, index: any) => {
        return {
          Userid: item?.USERID != null ? item?.USERID : '-',
          FirstName: item?.NAME != null ? item?.NAME : '-',
          Region: item?.Region != null ? item?.Region : '-',
          Gender: item?.Gender != null ? item?.Gender : '-',
          Role: item?.Role != null ? item?.Role : '-',
          StoreCode: item?.Store_code != null ? item?.Store_code : '-',
          City: item?.City != null ? item?.City : '-',
        };
      }) : [{ Userid: '-', FirstName: 'No data available', Region: '-', Gender: '-', Role: '-', StoreCode: '', City: '' }];

      console.log(transformedData);

      // Bind the transformed data to the dataSource
      this.dataSource.data = transformedData;
      console.log(this.dataSource);
    })
  }

  reset() {
    window.location.reload();
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'Monthly_Topper_Report.xlsx');
  }

}
