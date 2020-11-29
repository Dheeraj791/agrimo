import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterRecordService } from '../../masterrecords/master-record.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  ticketNumber: any;
  ticketDesc: any = 'Need to know if this is right time to grow tomato';
  userData = JSON.parse(localStorage.getItem('user_data'));
  userComment: any;
  ticketComments: any = [
    {
      "user_name": 'Saurav Asopa',
      "date": '6 Aug 20 8:35 PM',
      "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."'
    },
    {
      "user_name": 'Abhilash Tiwari',
      "date": '6 Aug 20 8:35 PM',
      "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."'
    },
    {
      "user_name": 'Test User',
      "date": '6 Aug 20 8:35 PM',
      "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."'
    }
  ]

  constructor(private route: ActivatedRoute, private router: Router, private backendService: MasterRecordService) { 
    this.ticketNumber = this.route.snapshot.paramMap.get('id');
    console.log(this.ticketNumber);
    // this.route.queryParams.subscribe(params => {
    //   this.ticketNumber = params['id'];
    //   console.log(params);
    // });
  }

  ngOnInit(): void {
    let obj = {
      "ticket_no": this.ticketNumber,
      "ticket_status": "1",
      "ticket_added_by": this.userData[0].user_type

    }
    console.log(obj);
    this.backendService.fetchTicketComments(obj).subscribe(
      res => {
        if (res.status === true) {
          this.ticketComments = res.result;
          // this.url = res.url;
          // this.rerender();
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      }
    )
  }

  onBackButtonClick() {
    this.router.navigate(['support', 'tickets']);
  }

  onAddComments(form: NgForm) {
    if (form.invalid) {
      return
    }
    console.log(this.userComment);
    let obj = {
      "ticket_no": this.ticketNumber,
      "user_comment": this.userComment,
      "comment_added_by": this.userData[0].user_name
    }
    this.backendService.addUserComments(obj).subscribe(
      res => {
        console.log(res);
        this.backendService.fetchTicketComments(obj).subscribe(
          res => {
            if (res.status === true) {
              this.ticketComments = res.result;
              // this.url = res.url;
              // this.rerender();
              // this.spinner.hide();
            } else {
              // this.spinner.hide();
            }
          }
        )
      }
    )
  }

  onCancelClick() {
    this.userComment = '';
  }
}
