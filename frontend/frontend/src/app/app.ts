import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from './core/services/session.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  get user(): User | null {
    return this.sessionService.getUser();
  }

  get role(): string | null {
    return this.sessionService.getUserRole();
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}
