import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  getisAuthenticated = false;
  URLstring = environment.apiURL;
  userinfo=JSON.parse(localStorage.getItem("userinfo") || "[]");
  constructor(public Http: HttpClient) {
 
  }
  
  login(data:any):Observable<any>{
    var tempurl = `${this.URLstring}` + `Login`;
    return this.Http.post(tempurl, data); 
  }
    
  getDepartment(orgid: any): Observable<any> {
    var tempurl = `${this.URLstring}` + `GetDepartment?orgid=${orgid}`;
    return this.Http.get(tempurl, orgid); 
  }
  getRoleWise(orgid: any,deptId:any): Observable<any> {
    var tempurl = `${this.URLstring}` + `GetRoleWise?orgid=${orgid}&id_deprt=${deptId}`;
    return this.Http.get(tempurl, orgid); 
  }
                                                     // orgid, deptid, roleid, this.formattedStartDate, this.formattedEndDate, daycount
  getLoginreport(orgid: any,deptId:any,roleId:any,startDate:any,endDate:any,daycount:any): Observable<any> {
    var tempurl = `${this.URLstring}` + `GetLoginreport?orgid=${orgid}&Id_department=${deptId}&rolewise=${roleId}&startDate=${startDate}&endDate=${endDate}&daycount=${daycount}`;
    console.log(tempurl);
    return this.Http.get(tempurl, orgid); 
  }
  
  getAssessmentlist(orgid: any): Observable<any> {
    var tempurl = `${this.URLstring}` + `GetAssessmentlist?orgid=${orgid}`;
    return this.Http.get(tempurl, orgid); 
  }

  getGetcourse(orgid:any):Observable<any>{
    var tempurl = `${this.URLstring}` + `Getcourse?orgid=${orgid}`;
    return this.Http.get(tempurl, orgid); 
  }

   getCourseReport(orgid: any,categoryId:any,assessmentId:any,roleId:any,startDate:any,endDate:any): Observable<any> {
    var tempurl = `${this.URLstring}` + `COECourse?orgid=${orgid}&category=${categoryId}&assessment_id=${assessmentId}&rolewise=${roleId}&startDate=${startDate}&endDate=${endDate}`;
    console.log(tempurl);
    return this.Http.get(tempurl, orgid); 
  }

  getRegionlist(orgid: any): Observable<any> {
    // var tempurl = `${this.URLstring}` + `GetRegionlist?orgid=${orgid}`;
    var tempurl = `${this.URLstring}` + `GetRegionlist`
    return this.Http.get(tempurl, orgid); 
  }
  DDKorgid(orgid: any): Observable<any> {
    var tempurl = `${this.URLstring}` + `DDKorgid?orgid=${orgid}`
    return this.Http.get(tempurl, orgid); 
  }

  DDKQuestionan(ddkorgid: any): Observable<any> {
    var tempurl = `${this.URLstring}` + `DDKQuestionan?orgid=${ddkorgid}`
    return this.Http.get(tempurl, ddkorgid); 
  }
  
  monthlyTopper(orgid: any,month:any,id_assessment:any,roleId:any,region:any): Observable<any> {
    var tempurl = `${this.URLstring}` + `MonthlyTopper?orgid=${orgid}&month=${month}&id_assessment=${id_assessment}&roleId=${roleId}&region=${region}`;
    return this.Http.get(tempurl, orgid); 
  }





}
 
 
   
  
