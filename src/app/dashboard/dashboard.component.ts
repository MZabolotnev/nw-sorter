import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromController from '../controller/store/controller.reducer';
import { ControllerService } from '../controller/store/controller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  controller$: Observable<fromController.State>;

  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {
    this.controller$ = this.controllerService.controller$;
  }

  updateFolderPath(folderPath: string) {
    this.controllerService.updateFolderPathAction(folderPath);
  }
}
