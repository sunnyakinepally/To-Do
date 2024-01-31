import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, reduce } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public subject=new BehaviorSubject<any>('')

  gettasks() {
    return this.http.get('http://localhost:3000/gettrackdata')
  }

  postdata(data: any): Observable<any> {
    console.log('recieved upto api', data)
    return this.http.post('http://localhost:3000/insert', data)

  }

  update(data:any): Observable<any> {
    console.log('updated to be',data)
    return this.http.post('http://localhost:3000/update', data)
  }

  delete(data:any): Observable<any> {
    console.log('delete to be',data)
    return this.http.post('http://localhost:3000/delete',data)
  }

// sendingfromparent<t>(data:any){
//   this.subject.next(data)

// }
// recieveinchild<t>():Observable<any>{
//   return this.subject.asObservable()
// }

}
