import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { ControllerEffects } from './controller.effects';
import { createHttpFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { ControllerService } from '@client/app/controller/store/controller.service';
import { WidgetService } from '@client/app/widget/services/widget.service';

describe('ControllerTimeEffects', () => {
  let service: ControllerEffects;
  let actions$: Observable<any>;
  let spectator: SpectatorService<ControllerEffects>;

  const createService = createHttpFactory({
    service: ControllerEffects,
    imports: [],
    providers: [provideMockActions(() => actions$)],
    mocks: [ControllerService, WidgetService],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    actions$ = of();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
