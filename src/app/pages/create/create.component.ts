import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Location } from '@angular/common';
import { ToastService } from 'angular-toastify';
import { StudentService } from '../../services/student.services';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuild: FormBuilder,
    private service: StudentService,
    private _toastService: ToastService,
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.formBuild.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  hasErros(field: string) {
    if (!this.submitted) return;

    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.service.saveStudent(this.form.value).subscribe({
        next: (student) => {
          this.submitted = false;
          this.form.reset();
          this.loading = false;
          this._toastService.success('Estudante cadastrado com sucesso!');
          this.location.back();
        },
        error: (err) => {
          this.loading = false;
          this._toastService.error('Erro ao cadastrar estudante!');
          console.log(err);
        },
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
