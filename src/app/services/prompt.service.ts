import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { App, Deploy, Workflow } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
    containBlocks = [
      'Workflow.if', 'Workflow.ifElse', 'Workflow.tryCatch',
      'Workflow.forArray', 'Workflow.forObject',
    ];

    workflowToPrompt(apps: App[], workflow: Workflow) {
      if (!workflow) return [];

      const workflowPrompt = [];

      

    }

    getAppName(apps: App[], app: App) {
      return apps.find((existingApp) => existingApp.name === app.name && existingApp.method === app.method)!;
    }
}
