import { Component, OnInit } from '@angular/core';
import { LoginService } from './login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'marrige-maal-hisab';
  isLoggedIn: boolean = false;
  constructor(private service: LoginService){}

  
  ngOnInit(): void {
    this.doLogin();
  }

  private doLogin(){
    this.service.login().subscribe(data =>{
      this.isLoggedIn = data;
    })
  }
}
