import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromAuthReducers from './store/reducers/auth.reducers';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ auth: fromAuthReducers.reducer }),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [FormBuilder, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
