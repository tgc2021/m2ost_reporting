import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent {

  activeIndex:any;
  activeTab: Boolean = false;
  route:any;
  userInfo:any=[];
  department:any=[];
  activeRouteIndex:any;
  sidebar:any=[];
  idRole: any;
  dropdownItems = [
    {
      title: 'Login Report',
      value: [
        // { content: 'All' },
        // { content: 'Monthly' }
      ]
    },
 
    {
      title:'Course Completion Report',
      value:[
        // { content: 'All' },
        // { content: 'Department' }
      ]
    },
    {
      title:'Learning Trivia Report',
      value:[
        // { content: 'All' },
        // { content: 'Department' }
      ]
    },
    {
      title:'Assessment Score Report',
      value:[
        { content: 'All' },
        { content: 'Department' }
      ]
    },
  
    // {
    //   title:'Monthly Topper Report',
    //   },
  ];
  page: any;
  

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private http:ServiceService
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userinfo") || "[]");
    // this._router.navigateByUrl('/home/login-report');

    this.activeIndex=JSON.parse(localStorage.getItem('activeindex')||"")
    console.log(this.activeRouteIndex);
    
    console.log(this.userInfo );
     this.idRole=this.userInfo?.ID_ROLE;
      this.sidebar = [
        // {
        //   content: 'Dashboard',
        //   // image: 'assets/side-navigation/dashboard.png',
        //   image: 'bi bi-house-door',
    
        // },
        {
          content: 'Organization Creation',
          image: 'bi bi-grid',
        },
        // {
        //   content: 'User Role Creation',
        //   image: 'bi bi-person',
          
        // },
        {
          content: 'Admin Creation',
          image: 'bi bi-people',
          
        },
        // {
        //   content: 'Mini Game Setup',
        //   image: 'bi bi-folder2-open', 
        // },  
        // {
        //   content: 'Assessment',
        //   image: 'bi bi-filter-square',
        // },
        // {
        //   content: 'Rewards',
        //   image: 'bi bi bi-star', 
        // },
        // {
        //   content: 'MIS & Analytics',
        //   image: 'bi bi bi-kanban',  
        // },
        // {
        //   content: 'User Management',
        //   image: 'bi bi-person-workspace',  
        // },
        // {
        //   content: 'Build Version',
        //   image: 'bi bi-box-fill',
        // },
        // {
        //   content: 'User Creation',
        //   image: 'bi bi-person-plus',
          
        // },
      ];
      
    // this.GetDepartment()
  }

  GetDepartment(){
    const orgid=this.userInfo.ID_ORGANIZATION ;
   this.http.getDepartment(orgid).subscribe((res:any)=>{
    this.department=res;
    console.log(this.department);
    
   }) 
//   this.department=[
//     {
//         "Id_department": 1,
//         "Department_name": "BATA"
//     },
//     {
//         "Id_department": 2,
//         "Department_name": "HP"
//     },
//     {
//         "Id_department": 3,
//         "Department_name": "FRN_BATA"
//     },
//     {
//         "Id_department": 4,
//         "Department_name": "FRN_HP"
//     }
// ]
  }
  Navigate(pageIndex:any){
  //   this.page=pageIndex;
  //  console.log('pageIndex',this.page);
   
   
  }
  NavigateTo(index: any) {

    // this.page=page;
    this.activeIndex = index;
    // console.log(index,page);
    
    this.activeTab = true;
    localStorage.setItem('activeindex',JSON.stringify(this.activeIndex))
  
      const routes: { [key: number]: string } = {
        0: '/home/login-report',
        1: '/home/course-completion-report',
        2: '/home/learning-trivia-report',
        3:'/home/assessment-trivia-report'
        // 3: '/home/monthly-topper-report',

        //  1: '/home/user-role-creation',
        // 2:'/home/user-creation',
       // 1: '/home/mini-game-creation',
       // 2: '/home/assessment',
        // 5: '/home/rewards',
        // 6: '/home/mis-analytics',
        // 7: '/home/user-management',
        // 8: '/home/build-version'
    };
    const route = routes[index as keyof typeof routes];
    console.log(route);
    if (route) {
        this._router.navigateByUrl(route);
    }
   
  // this.activeIndex='';
  }
  
  logout(){
    this._router.navigateByUrl('login');
    localStorage.clear();
  
  }
 
  toggleDropdown(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const dropdownContent = target.nextElementSibling as HTMLElement;
    dropdownContent.style.display = dropdownContent.style.display == 'none' ? 'block' : 'none';
    target.classList.toggle('active');
  }
  gotoHome(){
    this._router.navigateByUrl('home');

  }
  
}
