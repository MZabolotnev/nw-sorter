import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fileListActions from './file-list.actions';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';
import { FileListService } from './file-list.service';
import { ControllerService } from '../../controller/store/controller.service';
import { FileSystemService } from '../../shared/services/file-system.service';
import { of, from } from 'rxjs';
import { NOTIFICATIONS } from '../../shared/constants/notifications';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class FileListEffects {
  constructor(
    private actions$: Actions,
    private fileListService: FileListService,
    private controllerService: ControllerService,
    private fileSystemService: FileSystemService,
    public notificationService: NotificationService
  ) {}

  updateFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileListActions.updateFiles),
      withLatestFrom(this.controllerService.controller$),
      switchMap(([action, controller]) =>
        from(
          this.fileSystemService.searchFiles(
            controller.folderPath,
            controller.filenames
          )
        ).pipe(
          map((files) => {
            return fileListActions.updateFilesSuccess({ files });
          }),
          catchError((error: any) => {
            this.notificationService.error({
              title: NOTIFICATIONS.ERROR.SEARCH_FILES.TITLE,
              message: error,
            });
            return of(fileListActions.updateFilesFail());
          })
        )
      )
    )
  );




  applyFileList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileListActions.applyFiles),
      withLatestFrom(this.controllerService.controller$, this.fileListService.fileList$),
      switchMap(([action, controller, fileList]) =>
        from(
          this.fileSystemService.processFiles(

          )
        ).pipe(
          map((success) => {
            console.log('APPLY FILES ACTION')
            return fileListActions.applyFilesSuccess();
          }),
          catchError((error: any) => {
            this.notificationService.error({
              title: '',
              message: error,
            });
            return of(fileListActions.applyFilesFail());
          })
        )
      )
    )
  );


}
