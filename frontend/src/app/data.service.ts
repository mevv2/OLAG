import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { userInfo } from 'os';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private currentUserSubject: BehaviorSubject<User>;
 // public currentUser: Observable<User>;

  
  loggedIn: boolean; 
  
  uri = 'http://localhost:3001/openlair';


  constructor(private http: HttpClient) {
   //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        //this.currentUser = this.currentUserSubject.asObservable();
  }

  getdata() {
    return this.http.get(`${this.uri}/display/data`);
  }

  getgriddata(): Observable<any> {
    return this.http.get(this.uri);
  }
  
  getsearchresult(search: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    }
    return this.http.post(`${this.uri}/getsearchmetrics`, { search, httpOptions });
  }

  getsearchind(search: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    }
    return this.http.post(`${this.uri}/getsearchindicator`, { search, httpOptions });
  }

  addData(LearningEvents: any, LearningActivities: any, indicator: any) {

    const data1 = {
      LearningEvents: LearningEvents,
      LearningActivities: 
      {
        Name: LearningActivities,
        indicator: indicator,
      }
    };
    console.log("addData:", data1);
    return this.http.post(`${this.uri}/add/data`, data1);
  }

  saveChangedData(data: any) {
    return this.http.post(`${this.uri}/save-changes`, data);
  }

  //public get currentUserValue(): User {
    //return this.currentUserSubject.value;
  //}

  login(username: any, password: any) {
    console.log(username)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    }

    return this.http.post(`${this.uri}/login`, { username, password, httpOptions }).pipe(map(user => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      //user.authdata = window.btoa(username + ':' + password);
      //this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      //return user;
  }));
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getActivities(searchAct: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    }

    return this.http.post(`${this.uri}/getActivities`, { searchAct, httpOptions });
  }


  upload(file) {


    const formData = new FormData();

    formData.append('file', file, file.name);
    return this.http.post(`${this.uri}/upload`, formData);



  }




}


