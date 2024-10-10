import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '@service/toast.service'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string = '';
  isVisible: boolean = false;
  type: 'success' | 'error' | 'warning' = 'success';

  constructor(private readonly toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast: Toast) => {
      this.message = toast.message;
      this.type = toast.type;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 4000);
    });
  }
}
