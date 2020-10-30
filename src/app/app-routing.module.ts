import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';

export const APP_ROUTES: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}
