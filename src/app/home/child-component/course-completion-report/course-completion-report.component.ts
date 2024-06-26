import { DatePipe } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import * as XLSX from 'xlsx'; // Import xlsx library
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// Define the interface for periodic elements
// export interface UserData {
//   Userid: string;
//   Name: string;
//   Gender: string;
//   Region: string;
//   Csst_Role: string;
//   City: string;
//   Course:string 
//   Read_Count:string
//   Attempt_Number:string;
//   Adoption_Percent:String;
//   Categoryname:string;
//   Completion_Percent:number;
//   Max_result_in_percentage:number;
//   Store_Code: string;
//   Total_content_count:string;
//   Start_date:string;
//   Date_of_joining:string;
//   Status:string;
// }

export interface UserData {
  Userid: string;
  Name: string;
  Gender: string;
  Region: string;
  Csst_Role: string;
  City: string;
  Course: string;
  Read_Count: string;
  Attempt_Number: string;
  Adoption_Percent: string;
  Categoryname: string;
  Completion_Percent: string;
  Max_result_in_percentage: string;
  Store_Code: string;
  Total_content_count: string;
  Start_date: string;
  Date_of_joining: string;
  Status: string;
}
@Component({
  selector: 'app-course-completion-report',
  templateUrl: './course-completion-report.component.html',
  styleUrls: ['./course-completion-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseCompletionReportComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content') content!: TemplateRef<any>; // Declare content template reference

  // Define displayed columns and data source for the table
  displayedColumns: string[] = ['Userid', 'Name', 'Gender', 'Region', 'Csst_Role', 'City', 'Store_Code', 'Date_of_joining', 'Status', 'Start_date', 'Course', 'Categoryname', 'Read_Count', 'Total_content_count', 'Adoption_Percent', 'Max_result_in_percentage', 'Completion_Percent', 'Attempt_Number'];
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
  assessmentValue = 'Select Assessment'
  courseValue = 'Select Course'
  roleId: number = 0;
  roles: any = [];
  selectedRoleIds: number[] = [];
  selectedValue: any[] = [];
  courseReportData: any[] = [];
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  selectedDepartmentIds: any[] = [];
  selectedDepartmentValues: any[] = [];
  selectedAssessmentIds: any[] = [];
  selectedAssessmentValues: any[] = [];
  selectedCourseId: any[] = [];
  selectedCourseValues: any[] = [];
  assessmentList: any = [];
  courseList: any = [];
  assessmentid: any;
  submitted = false;

  message: any;
  filteredCourseList: any;
  filteredAssessmentList: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private http: ServiceService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
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
      this.selectedDepartmentIds = this.selectedDepartmentIds.filter(id => id !== dept.Id_department);
      this.selectedDepartmentValues = this.selectedDepartmentValues.filter((dept: any) => dept !== dept.Department_name)
    }
    console.log(this.selectedDepartmentIds);
    this.departmentValue = this.selectedDepartmentValues?.[0] || 'Select Department';
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
    this.departmentValue = this.selectedDepartmentValues?.[0] || 'Select Department';
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
    this.roleValue = this.selectedValue?.[0] || 'Select Role';
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
      this.filteredAssessmentList = res;
    })
  }


  filterAssessment(event: any) {
    const searchTerm: string = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!searchTerm) {
      this.filteredAssessmentList = this.assessmentList.slice(); // Show all courses if search term is empty
      return;
    }
    this.filteredAssessmentList = this.assessmentList.filter((asse: any) =>
      asse.Assessment_title.toLowerCase().startsWith(searchTerm)
    );
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
    this.assessmentValue = this.selectedAssessmentValues?.[0] || 'Select Assessment';

  }

  isAllAssessmentsSelected(): boolean {
    return this.assessmentList.length > 0 && this.selectedAssessmentIds.length === this.assessmentList.length;
  }

  toggleSelectAllAssessments(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedAssessmentIds = this.assessmentList.map((ass: any) => ass.Id_assessment);
      this.selectedAssessmentValues = this.assessmentList.map((ass: any) => ass.Assessment_title);
    } else {
      this.selectedAssessmentIds = [];
      this.selectedAssessmentValues = [];
    }
    console.log(this.selectedAssessmentIds);
    this.assessmentValue = this.selectedAssessmentValues?.[0] || 'Select Assessment';
  }

  // Methods for Cource Select All functionality
  getcourselist() {
    const orgId = this.http.userinfo?.ID_ORGANIZATION;
    this.http.getGetcourse(orgId).subscribe((res: any) => {
      this.courseList = res;
      this.filteredCourseList = this.courseList.slice(); // Initial copy of courseList


    })
  }


  filterCourses(event: any) {
    const searchTerm: string = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!searchTerm) {
      this.filteredCourseList = this.courseList.slice(); // Show all courses if search term is empty
      return;
    }
    this.filteredCourseList = this.courseList.filter((course: any) =>
      course.CATEGORYNAME.toLowerCase().startsWith(searchTerm)
    );
  }

  isCourceSelected(category: any): boolean {
    return this.selectedCourseId.includes(category.ID_CATEGORY);
  }

  toggleCategorySelection(category: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedCourseId.push(category.ID_CATEGORY);
      this.selectedCourseValues.push(category.CATEGORYNAME);
    } else {
      this.selectedCourseId = this.selectedCourseId?.filter(id => id !== category.ID_CATEGORY);
      this.selectedCourseValues = this.selectedCourseValues?.filter(name => name !== category.CATEGORYNAME);
    }
    console.log(this.selectedCourseId);
    this.courseValue = this.selectedCourseValues?.[0] || 'Select Course';

  }
  isAllCourseSelected(): boolean {
    return this.courseList.length > 0 && this.selectedCourseId.length === this.courseList.length;
  }

  toggleSelectAllCourses(event: Event) {
    console.log(event);
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    console.log(isChecked);

    console.log(this.selectedCourseId);
    console.log(this.selectedCourseValues);

    if (isChecked) {
      console.log(this.courseList);
      this.selectedCourseId = this.courseList.map((cate: any) => cate.ID_CATEGORY);
      this.selectedCourseValues = this.courseList.map((cat: any) => cat.CATEGORYNAME);

    } else {
      this.selectedCourseId = [];
      this.selectedCourseValues = [];
    }
    console.log(this.selectedCourseId);
    this.courseValue = this.selectedCourseValues?.[0] || 'Select Course';
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

  getCourseReport() {
    this.logSelectedDates();
    const orgid = this.http.userinfo.ID_ORGANIZATION;
    const catId = this.selectedCourseId.join(',');
    const assId = this.selectedAssessmentIds.join(',');
    const roleid = this.selectedRoleIds.join(',');
    console.log(orgid, catId, assId, roleid, this.formattedStartDate, this.formattedEndDate);
    //  console.log( '123',   this.formattedStartDate !== '' &&
    //  this.formattedEndDate !== '' &&
    //  this.selectedDepartmentIds.length > 0 &&
    //  this.selectedRoleIds.length > 0 &&
    //  this.daysvalue != 'Select Login Activity Status');
    console.log(this.isFormValid());

    if (this.isFormValid()) {
      this.openModal('Loading data, please wait...');
      this.http.getCourseReport(orgid, catId, assId, roleid, this.formattedStartDate, this.formattedEndDate)
        .subscribe({
          next: (res: any) => {
            const statusCode = res.status;
            console.log('Status Code:', statusCode);

            if (res != '') {
              this.courseReportData = res;
              console.log(this.courseReportData);
              console.log(this.courseReportData[0]?.Message);
              // const transformedData = this.courseReportData.length > 0 ? this.courseReportData.map((item: any) => {
              //   return {
              //     Userid: item?.userid != null ? item?.userid : '-',
              //     Name: item?.Fullname != null ? item?.Fullname : '-',
              //     Gender: item?.GENDER != null ? item?.GENDER : '-',
              //     Region: item?.Region != null ? item?.Region : '',
              //     Csst_Role: item?.csst_role != null ? item?.csst_role : '-',
              //     City: item?.city != null ? item?.city : '-',
              //     Store_Code:item?.Store_Code !=null ? item?.Store_Code:'-',
              //     Date_of_joining:item?.DATE_OF_JOINING !=null ? item?.DATE_OF_JOINING:'-',
              //     Status:item?.STATUS !=null ? item?.STATUS:'',
              //     Start_date:item?.start_date !=null ? item?.start_date:'-',
              //     Course:item?.Course !=null ?item?.Course:this.courseReportData[0]?.Message,
              //     Categoryname:item?.categoryname !=null ? item?.categoryname:'-',
              //     Read_Count:item?.Read_Count !=null ? item?.Read_Count:'-',
              //     Total_content_count:item?.total_content_count !=null ? item?.total_content_count:'-',
              //     Adoption_Percent:item?.Adoption_Percent !=null ? item?.Adoption_Percent:'-',
              //     Max_result_in_percentage:item?.max_result_in_percentage !=null ? item?.max_result_in_percentage:'-',
              //     Completion_Percent:item?.completion_Percent !=null ? item?.completion_Percent:'-',
              //     Attempt_Number:item?.Attempt_Number !=null ? item?.Attempt_Number :'-',

              //   };
              // }) : [];

              const transformedData = this.courseReportData.length > 0 ? this.courseReportData.map((item: any) => {
                return {
                  Userid: item?.userid != null ? item?.userid : '-',
                  Name: item?.Fullname != null ? item?.Fullname : '-',
                  Gender: item?.GENDER != null ? item?.GENDER : '-',
                  Region: item?.Region != null ? item?.Region : '',
                  Csst_Role: item?.csst_role != null ? item?.csst_role : '-',
                  City: item?.city != null ? item?.city : '-',
                  Store_Code: item?.Store_Code != null ? item?.Store_Code : '-',
                  Date_of_joining: item?.DATE_OF_JOINING != null ? item?.DATE_OF_JOINING : '-',
                  Status: item?.STATUS != null ? item?.STATUS : '',
                  Start_date: item?.start_date != null ? item?.start_date : '-',
                  Course: item?.Course != null ? item?.Course :"No Data Found",
                  Categoryname: item?.categoryname != null ? item?.categoryname : '-',
                  Read_Count: item?.Read_Count != null ? item?.Read_Count : '-',
                  Total_content_count: item?.total_content_count != null ? item?.total_content_count : '-',
                  Adoption_Percent: item?.Adoption_Percent != null ? `${Number(item?.Adoption_Percent) * 100}%` : '0%',
                  Max_result_in_percentage: item?.max_result_in_percentage != null ? `${Number(item?.max_result_in_percentage) * 100}%` : '0%',
                  Completion_Percent: item?.completion_Percent != null ? `${Number(item?.completion_Percent) * 100}%` : '0%',
                  Attempt_Number: item?.Attempt_Number != null ? item?.Attempt_Number : '-',
                };
              }) : [];
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
    XLSX.writeFile(workbook, 'Course_Completion_Report.xlsx');
  }

  openModal(data: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    this.modalService.open(this.content, modalOptions); // Open modal with content template reference
    this.message = data;
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
      this.selectedRoleIds.length > 0 &&
      this.selectedCourseId.length > 0 &&
      this.selectedAssessmentIds.length > 0
    );
  }

}
