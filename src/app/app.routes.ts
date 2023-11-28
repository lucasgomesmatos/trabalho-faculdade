import { Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    title: 'Listagem de Alunos',
  },
  {
    path: 'criar',
    component: CreateComponent,
    title: 'Criar Aluno',
  },
  {
    path: 'editar/:id',
    component: EditComponent,
    title: 'Editar Aluno',
  },
];
