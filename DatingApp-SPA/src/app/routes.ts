import { AuthGuard } from './_guards/auth.guard';
import { Component } from '@angular/core';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes, CanActivate } from '@angular/router';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            {path: 'members', component: MemberListComponent , canActivate: [AuthGuard] },
            {path: 'messages', component: MessagesComponent , canActivate: [AuthGuard] },
            {path: 'lists', component: ListsComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
