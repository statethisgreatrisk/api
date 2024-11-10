import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';
import { NgFor, NgIf } from '@angular/common';

interface Doc {
  name: string;
  method: string;
  params: string[];
  returns: string[];
  info: string[];
}

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './api-docs.component.html',
  styleUrl: './api-docs.component.scss'
})
export class ApiDocsComponent {
  docs: Doc[] = [
    { name: 'String', method: 'isEqual', params: ['string', 'string'], returns: ['boolean: if arg1 is equal to arg2.'], info: [] },
    { name: 'String', method: 'isNotEqual', params: ['string', 'string'], returns: ['boolean: if arg1 is not equal to arg2.'], info: [] },
    { name: 'String', method: 'toLowerCase', params: ['string'], returns: ['string: the string in lowercase.'], info: [] },
    { name: 'String', method: 'toUpperCase', params: ['string'], returns: ['string: the string in uppercase.'], info: [] },
    { name: 'String', method: 'trim', params: ['string'], returns: ['string: the string after removing whitespace from both ends of the string.'], info: [] },
    { name: 'String', method: 'includes', params: ['string', 'string'], returns: ['boolean: if arg2 is found within arg1.'], info: [] },
    { name: 'String', method: 'startsWith', params: ['string', 'string'], returns: ['boolean: if arg1 starts with arg2.'], info: [] },
    { name: 'String', method: 'endsWith', params: ['string', 'string'], returns: ['boolean: if arg1 ends with arg2.'], info: [] },
    { name: 'String', method: 'concat', params: ['string', 'string'], returns: ['string: the string after concatenating arg1 and arg2.'], info: [] },
    { name: 'String', method: 'indexOf', params: ['string', 'string'], returns: ['number: the index of the first occurrence of arg2 in arg1.'], info: [] },
    
    { name: 'Number', method: 'greaterThan', params: ['number', 'number'], returns: ['boolean: if arg1 is greater than arg2.'], info: [] },
    { name: 'Number', method: 'greaterThanEqualTo', params: ['number', 'number'], returns: ['boolean: if arg1 is greater than or equal to arg2.'], info: [] },
    { name: 'Number', method: 'lessThan', params: ['number', 'number'], returns: ['boolean: if arg1 is less than than arg2.'], info: [] },
    { name: 'Number', method: 'lessThanEqualTo', params: ['number', 'number'], returns: ['boolean: if arg1 is less than or equal to arg2.'], info: [] },
    { name: 'Number', method: 'isEqual', params: ['number', 'number'], returns: ['boolean: if arg1 is equal to arg2.'], info: [] },
    { name: 'Number', method: 'isNotEqual', params: ['number', 'number'], returns: ['boolean: if arg1 is not equal to arg2.'], info: [] },

    { name: 'API', method: 'params', params: ['null | string: the name of a property on the Express request.params object.'], returns: ['string: the value of the request.params property.', 'object: the entire request.params object if null.'], info: [] },
    { name: 'API', method: 'body', params: ['null | string: the name of a property on the Express request.body object.'], returns: ['any: the value of the request.body property.', 'object: the entire request.body object if null.'], info: [] },
    { name: 'API', method: 'status', params: ['number: the status code as a number.'], returns: ['number: the status code.', 'null: if the number is not a valid status code.'], info: ['This app sets the Express request.statusCode property. The request.statusCode property will not be set if the parameter is not a valid status code.'] },
    { name: 'API', method: 'send', params: ['string | boolean | object'], returns: ['object: the Express response body as message:arg1 (if a string or boolean), or the entire object if arg1 is an object.', 'null: if there is no value, or if the value is not a string, boolean, or JSON parsable object.'], info: ['This app ends the request workflow. Any rows after API.send() are not processed.'] },
    { name: 'Object', method: 'get', params: ['object: an object or the name of an object function.'], returns: ['object: the result of running the object function.', 'null: if no object, or if there is an error calling the object function.'], info: [] },
    { name: 'Object', method: 'getProperty', params: ['object: an object or the name of an object function.', 'string: the name of a property on the object.'], returns: ['any: the value of the property.', 'null: if no object, if no value or if there is an error calling the object function.'], info: [] },
    { name: 'Request', method: 'get', params: ['request: a request or the name of a request configuration.'], returns: ['request: the request configuration.', 'null: if no request.'], info: [] },
    { name: 'Request', method: 'send', params: ['request: a request or the name of a request configuration.'], returns: ['object: the response body or response error.', 'null: if no request.'], info: ['This app sends (awaits) a request. The workflow will resume once the request has completed.'] },
    { name: 'Storage', method: 'get', params: ['storage: a storage object or the name of a storage object.'], returns: ['storage: the storage object.', 'null: if no storage object.'], info: [] },
    { name: 'Storage', method: 'createDocument', params: ['storage: a storage object or the name of a storage object.', 'object: an object or the name of an object function.'], returns: ['document: the inserted document.', 'null: if the document does not pass the storage schema.'], info: ['Use this app to add an object (document) into storage.'] },
    { name: 'Workflow', method: 'comment', params: [], returns: [], info: ['Inserts a comment row.'] },
    { name: 'Workflow', method: 'if', params: ['condition: a value or values to be determined as true or false.'], returns: [], info: [] },
    { name: 'Workflow', method: 'ifElse', params: ['condition: a value or values to be determined as true or false.'], returns: [], info: [] },
    { name: 'Workflow', method: 'forArray', params: ['simpleVariable: the name of the iterating element.', 'array: an array.', 'simpleVariable: the index (returns a number).'], returns: [], info: [] },
    { name: 'Workflow', method: 'forObject', params: ['simpleVariable: the name of the iterating value.', 'object: an object or the name of an object function.', 'simpleVariable: the property (returns a string).'], returns: [], info: [] },
    { name: 'Workflow', method: 'print', params: ['any: the value to print.'], returns: [], info: ['This app creates a deploy log with the printed value as a string.'] },
  ];

  constructor(
    private selectAppService: SelectAppService
  ) {}

  get docsSorted() {
    return this.docs.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      if (a.method < b.method) return -1;
      if (a.method > b.method) return 1;
      return 0;
    });
  }

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }

  scrollToApp(id: string) {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
