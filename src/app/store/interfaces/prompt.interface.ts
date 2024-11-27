export type Workflow = WorkflowApp[];

export interface WorkflowApp {
    appName: string;
    variables: WorkflowVariable[];
    arguments: WorkflowArgument[];
    executionBlocks: WorkflowApp[];
}

export type WorkflowVariable = string;
export type WorkflowArgument = string | number | boolean | object;

export type AppList = AppSchema[];

export interface AppSchema {
    appName: string;
    description: string;
    signature: string;
    variables: AppVariableSchema[] | null;
    arguments: AppArgumentSchema[] | null;
    executionBlocks: AppExecutionBlockSchema[] | null;
    returns: AppReturnSchema[];
}

export interface AppVariableSchema {
    index: number;
    description: string;
    acceptableTypes: string[];
}

export interface AppArgumentSchema {
    index: number;
    argumentName: string;
    description: string;
    acceptableTypes: string[];
}

export interface AppExecutionBlockSchema {
    index: number;
    description: string;
}

export type AppReturnSchema = 'null' | 'boolean' | 'number' | 'string' | 'object' | 'array' | 'any';

export type ObjectFunctionList = ObjectFunctionSchema[];

export interface ObjectFunctionSchema {
    name: string;
    functionBody: string;
}

export type ArrayFunctionList = ArrayFunctionSchema[];

export interface ArrayFunctionSchema {
    name: string;
    functionBody: string;
}

export type FunctionList = FunctionSchema[];

export interface FunctionSchema {
    name: string;
    functionBody: string;
}
