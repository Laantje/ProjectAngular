import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { FakeBackendInterceptor } from './fake-backend';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthGuard,
    ErrorInterceptor,
    FakeBackendInterceptor,
    JwtInterceptor
  ],
  exports: [
    AuthGuard,
    ErrorInterceptor,
    FakeBackendInterceptor,
    JwtInterceptor
  ]
})
export class HelpersModule { }
