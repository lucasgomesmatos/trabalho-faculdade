import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { StudentService } from '../../services/student.services';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuild: FormBuilder,
    private service: StudentService,
    private _toastService: ToastService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.service.findStudentById(id).subscribe({
          next: (student) => {
            this.form.patchValue(student);
          },
          error: (err) => {
            this.location.back();
          },
        });
      }
    });

    this.form = this.formBuild.group({
      registration: [null, [Validators.required]],
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
      this.service.updateStudent(this.form.value).subscribe({
        next: (student) => {
          this.submitted = false;
          this.form.reset();
          this.loading = false;
          this._toastService.success(
            `Estudante: ${student.name}, editado com sucesso!`
          );
          this.location.back();
        },
        error: (err) => {
          this.loading = false;
          this._toastService.error('Erro ao editar o estudante!');
          console.log(err);
        },
      });
    }
  }
}
