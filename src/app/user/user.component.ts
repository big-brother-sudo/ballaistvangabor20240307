import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// 1. fel.: Minden tulajdonság definiálása az User típusban a 
// https://jsonplaceholder.typicode.com/users/1
// responsa alapján:
export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // 2a. fel.: Az userData osztályváltozó típusának beállítsa User típusúra
  userData: User = {} as User;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  id: string = "-1";

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!
    //alert(this.id)
    this.getUser(this.id)
  }
  // 2b. fel.:GET kérés típusának beállítása User típusúra:
  getUser(id: string){
    let url = "https://jsonplaceholder.typicode.com/users/" + id;
    this.http.get<User>(url).subscribe(
      res=>{
        this.userData = res;
      }
    )
  }

}