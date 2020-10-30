import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { AppConfigService } from './service/config.service';

@Component({
  selector: 'bcc-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private appConfigService: AppConfigService) {

  }
}
