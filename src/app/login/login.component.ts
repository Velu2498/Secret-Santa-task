import { Component, OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() d="";

  constructor(private http:HttpClient) { 
    
  }

  ngOnInit() {
  }

 

//getting values from form
data = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});
// d=this.data.email

   //insert the value to database
   add(){
    console.log(this.data.value)
      this.http.post("http://localhost:3000/login",this.data.value)
      .subscribe(
        (data)=>{
        alert(data.mess);
        var v=data.mess
        // console.log(data)
      }, error => {
          console.log(error);
      }
      )

    }



}
