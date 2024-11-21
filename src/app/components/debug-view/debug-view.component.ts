import { Component, ElementRef, ViewChild } from '@angular/core';
import { DebugViewService } from '../../services/debug-view.service';
import { Subscription } from 'rxjs';
import { Arg, Workflow } from '../../store/interfaces/app.interface';
import { NgFor, NgStyle } from '@angular/common';
import { ResizableHeightDirective } from '../../directives/resizable-height.directive';

interface ValidationError {
  row: number;
  position: string;
  error: string;
}

@Component({
  selector: 'app-debug-view',
  standalone: true,
  imports: [NgFor, NgStyle, ResizableHeightDirective],
  templateUrl: './debug-view.component.html',
  styleUrl: './debug-view.component.scss'
})
export class DebugViewComponent {
  debugDataSub: Subscription | null = null;
  validationErrors: ValidationError[] = [];

  @ViewChild('debugViewContainer') debugViewContainer!: ElementRef;

  workflowBarHeight: string = localStorage.getItem('workflowBarHeight') || '250';

  constructor(private debugViewService: DebugViewService) {}

  ngOnInit() {
    this.initDebugData();
  }

  ngOnDestroy() {
    this.debugDataSub?.unsubscribe();
  }

  initDebugData() {
    this.debugDataSub = this.debugViewService.debugData$.subscribe((debugData) => {
      this.validationErrors = [];

      if (!debugData) return;
      this.validateRows(debugData.workflow, debugData.argtype);
    });
  }

  validateRows(workflow: Workflow, argtype: any) {
    if (!workflow || !workflow.rows) return;

    workflow.rows.forEach((row, index) => {
      row.returns.forEach((rtrns, i) => {
        if (!rtrns.value) return;
        this.processArg(index + 1, rtrns, argtype, 'Return', i + 1);
      });
      row.schemas.forEach((schema, i) => {
        if (!schema.value) return;
        this.processArg(index + 1, schema, argtype, 'Schema', i + 1);
      });
      row.variables.forEach((variable, i) => {
        if (!variable.value) return;
        this.processArg(index + 1, variable, argtype, 'Variable', i + 1);
      });
      row.args.forEach((arg, i) => {
        if (!arg.value) return;
        this.processArg(index + 1, arg, argtype, 'Argument', i + 1);
      });
    });
  }

  processArg(row: number, arg: Arg, argtype: any, type: string, typeIndex: number) {
    let valid = false;

    arg.argtypes.forEach((pattern) => {
      const regex = new RegExp(argtype[pattern]);
      const matches = regex.test(arg.value);
      if (matches) valid = true;
    });

    if (valid) return;

    const argtypes = this.formattedArgtypes(arg.argtypes);
    const position = type === 'Variable' || type === 'Return' || type === 'Schema' ? `${type}` : `${type} ${typeIndex}`;
    const errorMessage = `requires a ${argtypes} type.`;

    this.validationErrors.push({ row, position, error: errorMessage });
  }

  formattedArgtypes(argtypes: string[]) {
    if (argtypes.length === 0) return '';
    if (argtypes.length === 1) return argtypes[0];
    if (argtypes.length === 2) return argtypes.join(' or ');

    return `${argtypes.slice(0, -1).join(', ')}, or ${argtypes[argtypes.length - 1]}`;
  }

  openDocumentation() {
    
  }
}
