import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';
import { ActiveToast } from 'ngx-toastr/toastr/toastr.service';
import { INotification } from '../interfaces/interface';
import { DEFAULT_NOTIFICATION_OPTIONS } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  success(options: INotification): ActiveToast<any> {
    const { title, message } = options;
    return this.toastr.success(message, title, this.getOptions(options));
  }

  warning(options: INotification): ActiveToast<any> {
    const { title, message } = options;
    return this.toastr.warning(message, title, this.getOptions(options));
  }

  info(options: INotification): ActiveToast<any> {
    const { title, message } = options;
    return this.toastr.info(message, title, this.getOptions(options));
  }

  error(options: INotification): ActiveToast<any> {
    const { title, message } = options;
    return this.toastr.error(message, title, this.getOptions(options));
  }

  getOptions(options: INotification): Partial<IndividualConfig> {
    const toastOptions = {
      ...DEFAULT_NOTIFICATION_OPTIONS, ...options
    };
    return toastOptions;
  }
}
