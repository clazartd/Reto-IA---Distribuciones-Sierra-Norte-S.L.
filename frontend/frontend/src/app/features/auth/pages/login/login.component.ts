import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, Credentials } from '../../../../core/services/auth.service';
import { SessionService } from '../../../../core/services/session.service';
import { Router } from '@angular/router';

/**
 * LoginComponent: Pantalla de inicio de sesión simple y clara.
 * Usabilidad, feedback y delegación de lógica según buenas prácticas.
 */
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  isSubmitting = false;

  // Credenciales por defecto para desarrollo/demo (eliminar cuando se conecte API)
  private readonly defaultDevUser = {
    username: 'comercial',
    password: '1234'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {
    // Inicializa el formulario con usuario y contraseña por defecto
    this.loginForm = this.fb.group({
      username: [this.defaultDevUser.username, Validators.required],
      password: [this.defaultDevUser.password, Validators.required]
    });
  }

  onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.invalid) { return; }
    this.isSubmitting = true;

    const credentials: Credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(user => {
      this.isSubmitting = false;
      if (user) {
        this.sessionService.setSession(user);
        this.router.navigate(['/inicio']); // Placeholder de ruta tras login (protegida)
      } else {
        this.loginError = 'Usuario o contraseña incorrectos.';
        this.loginForm.patchValue({ password: '' });
      }
    }, () => {
      this.isSubmitting = false;
      this.loginError = 'Error de servidor. Intenta más tarde.';
    });
  }
}
