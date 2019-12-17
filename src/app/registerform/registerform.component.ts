import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
  }

  //getting values from form
  data = new FormGroup({
    Name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  //insert the value to database
  add(){
    // console.log(this.data.value)
      this.http.post("http://localhost:3000/data",this.data.value)
      .subscribe(
        (data)=>{
        alert(data.mess);
        // console.log(data)
      }, error => {
          console.log(error);
      }
      )

    }

}
