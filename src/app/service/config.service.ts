import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
// usar con Single Spa
// import { assetUrl } from '../../single-spa/asset-url';
// usar con standalone
import { config } from '../../assets/config/appConfig';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private configuration$: Observable<any>;

  constructor(private http: HttpClient) {}

  public loadConfigurations(): any {
    if (!this.configuration$) {
      this.configuration$ = of(config).pipe(shareReplay(1));
    }
    return this.configuration$;
  }
}
