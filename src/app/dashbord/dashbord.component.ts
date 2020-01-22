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

    setTimeout(() => {

    var data =  localStorage.getItem("token")
    var json={data}
    console.log(json)

    this.http.post("http://localhost:3000/afterlogin",json)
    .subscribe(
      (res:any)=>{ 
      console.log(res.status)
      alert(res.key);
      console.log("hmfcht")
    }, error => {
        console.log(error);
    } 
    )
      
    }, 1000);
    

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
