import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  getisAuthenticated = false;
  URLstring = environment.apiURL;
   
  constructor(public Http: HttpClient) {
 
  }
  
  login(data:any):Observable<any>{
    var tempurl = `${this.URLstring}` + `Login`;
    return this.Http.post(tempurl, data); 
  }
    


}
 
 
   
  
