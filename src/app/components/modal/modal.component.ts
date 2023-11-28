import { CommonModule, Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'angular-toastify';
import { StudentService } from '../../services/student.services';
import { StudentType } from '../../types/StudentType';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public student: StudentType,
    private service: StudentService,
    private _toastService: ToastService,
    private location: Location
  ) {}

  onConfirm(student: StudentType) {
    this.loading = true;
    this.service.deleteStudent(student.registration).subscribe({
      next: (_) => {
        this.loading = false;
        this._toastService.success(`Estudante foi excluído com sucesso!`);
        location.reload();
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading = false;
        this._toastService.error('Erro ao excluir o estudante!');
        console.log(err);
      },
    });
  }

  onCancel(result: boolean) {
    this.dialogRef.close(result);
  }
}
