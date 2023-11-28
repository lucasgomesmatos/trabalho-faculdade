import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subject, catchError, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { StudentService } from '../../services/student.services';
import { StudentType } from '../../types/StudentType';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  imports: [CommonModule, RouterModule],
})
export class ListComponent {
  students$ = new Observable<StudentType[]>();
  error$ = new Subject<boolean>();

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.students$ = this.studentService.findStudent().pipe(
      catchError((_) => {
        this.error$.next(true);
        return of([]);
      })
    );
  }

  onEdit(id: string) {
    this.router.navigate(['editar', id], {
      relativeTo: this.route,
    });
  }

  onDelete(student: StudentType) {
    this.dialog.open(ModalComponent, {
      data: student,
      width: '250px',
    });
  }
}
