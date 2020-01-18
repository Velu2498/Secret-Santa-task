import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  card=[];
  constructor(private http:HttpClient) { 

    var data =  localStorage.getItem("token")
    console.log(data)
    this.http.post("http://localhost:3000/afterlogin",data)
    .subscribe(
      (data:any)=>{ 
      alert(data);
    }, error => {
        console.log(error);
    } 
    )

    // this.http.get("http://localhost:3000/afterlogin")
    //   .subscribe(
    //     (data)=>{
    //     console.log(data)
    //     this.card.push(data)
    //   }
    //   )
    


  }


  ngOnInit() {
  }
 
  ngonchange(){
    
  }

 

}
