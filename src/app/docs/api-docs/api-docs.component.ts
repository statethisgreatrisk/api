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
    { name: 'String', method: 'replace', params: ['string', 'string', 'string'], returns: ['string: the string after replacing the first occurrence of arg2 in arg1 with arg3.'], info: [] },
    
    { name: 'Number', method: 'greaterThan', params: ['number', 'number'], returns: ['boolean: if arg1 is greater than arg2.'], info: [] },
    { name: 'Number', method: 'greaterThanEqualTo', params: ['number', 'number'], returns: ['boolean: if arg1 is greater than or equal to arg2.'], info: [] },
    { name: 'Number', method: 'lessThan', params: ['number', 'number'], returns: ['boolean: if arg1 is less than than arg2.'], info: [] },
    { name: 'Number', method: 'lessThanEqualTo', params: ['number', 'number'], returns: ['boolean: if arg1 is less than or equal to arg2.'], info: [] },
    { name: 'Number', method: 'isEqual', params: ['number', 'number'], returns: ['boolean: if arg1 is equal to arg2.'], info: [] },
    { name: 'Number', method: 'isNotEqual', params: ['number', 'number'], returns: ['boolean: if arg1 is not equal to arg2.'], info: [] },

    { name: 'Function', method: 'get', params: ['function: the name of a function.'], returns: ['any: the result of running the function.', 'null: if there is an error calling the function.'], info: [] },

    { name: 'Object', method: 'get', params: ['object: an object or the name of an object function.'], returns: ['object: the result of running the object function.', 'null: if no object, or if there is an error calling the object function.'], info: [] },
    { name: 'Object', method: 'getProperty', params: ['object: an object or the name of an object function.', 'string: the path of a property on the object.'], returns: ['any: the value of the property.', 'null: if no object, if no value or if there is an error calling the object function.'], info: [] },
    { name: 'Object', method: 'setProperty', params: ['object: an object or the name of an object function.', 'string: the path of a property on the object.', 'any: the value to set.'], returns: ['object: the updated object.', 'null: if no object or if there is an error calling the object function.'], info: [] },

    { name: 'Array', method: 'get', params: ['array: an array or the name of an array function.'], returns: ['array: the result of running the array function.', 'null: if no array, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'getElement', params: ['array: an array or the name of an array function.', 'number: the index of the element to get.'], returns: ['any: the element at the index.', 'null: if no array, if no element or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'setElement', params: ['array: an array or the name of an array function.', 'number: the index of the element to set.', 'any: the element to set.'], returns: ['array: the updated array.', 'null: if no array or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'push', params: ['array: an array or the name of an array function.', 'any: the element to add to the end of the array.'], returns: ['number: the updated array length.', 'null: if no array, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'unshift', params: ['array: an array or the name of an array function.', 'any: the element to add to the beginning of the array.'], returns: ['number: the updated array length.', 'null: if no array, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'pop', params: ['array: an array or the name of an array function.'], returns: ['any: the last element', 'null: if no array, no element, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'shift', params: ['array: an array or the name of an array function.'], returns: ['any: the first element', 'null: if no array, no element, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'concat', params: ['array: an array or the name of an array function.', 'array: an array or the name of an array function.'], returns: ['array: the new array', 'null: if no array, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'reverse', params: ['array: an array or the name of an array function.'], returns: ['array: the reversed array', 'null: if no array, or if there is an error calling the array function.'], info: [] },
    { name: 'Array', method: 'forEach', params: ['array: an array or the name of an array function.', 'fn: a callback function.'], returns: ['array: the original array', 'null: if no array, or if there is an error calling the callback function.'], info: [] },
    { name: 'Array', method: 'map', params: ['array: an array or the name of an array function.', 'fn: a callback function.'], returns: ['array: the updated array', 'null: if no array, or if there is an error calling the callback function.'], info: [] },
    { name: 'Array', method: 'reduce', params: ['array: an array or the name of an array function.', 'fn: a callback function.', 'any: the initial value.'], returns: ['any: the result of running the reduce function.', 'null: if no array, or if there is an error calling the callback function.'], info: [] },

    { name: 'API', method: 'params', params: ['null | string: the name of a property on the Express request.params object.'], returns: ['string: the value of the request.params property.', 'object: the request.params object if null.'], info: [] },
    { name: 'API', method: 'query', params: ['null | string: the name of a property on the Express request.query object.'], returns: ['string: the value of the request.query property.', 'object: the request.query object if null.'], info: [] },
    { name: 'API', method: 'body', params: ['null | string: the name of a property on the Express request.body object.'], returns: ['any: the value of the request.body property.', 'object: the request.body object if null.', 'null: a null value if there is no request.body object.'], info: [] },
    { name: 'API', method: 'status', params: ['number: the status code as a number.'], returns: ['number: the status code.', 'null: if the number is not a valid status code.'], info: ['This app sets the Express response.statusCode property. The response.statusCode property will not be set if the parameter is not a valid status code.'] },
    { name: 'API', method: 'send', params: ['string | boolean | object'], returns: ['object: the Express response body as message:arg1 (if a string or boolean), or the entire object if arg1 is an object.'], info: ['This app ends the request workflow. Any rows after API.send() are not processed.'] },

    { name: 'Storage', method: 'get', params: ['storage: a storage object or the name of a storage object.'], returns: ['storage: the storage object.', 'null: if no storage object.'], info: [] },
    { name: 'Storage', method: 'addOne', params: ['storage: a storage object or the name of a storage object.', 'object: an object or the name of an object function.'], returns: ['document: the inserted document.', 'null: if the document does not pass the storage schema.'], info: ['Use this app to add an object (document) into storage.'] },
    { name: 'Storage', method: 'findOne', params: ['storage: a storage object or the name of a storage object.', 'object: the query object.'], returns: ['document: the first document found that matches the query.', 'null: if no document is found.'], info: [] },
    { name: 'Storage', method: 'findOneById', params: ['storage: a storage object or the name of a storage object.', 'string: the document id.'], returns: ['document: the document with the given id.', 'null: if no document is found.'], info: [] },
    { name: 'Storage', method: 'deleteOne', params: ['storage: a storage object or the name of a storage object.', 'object: the query object.'], returns: ['string: the id of the first deleted document.', 'null: if no document is found.'], info: [] },
    { name: 'Storage', method: 'deleteOneById', params: ['storage: a storage object or the name of a storage object.', 'string: the document id.'], returns: ['string: the id of the deleted document.', 'null: if no document is found.'], info: [] },
    { name: 'Storage', method: 'updateOne', params: ['storage: a storage object or the name of a storage object.', 'object: the query object.', 'object: the new document.'], returns: ['document: the updated document.', 'null: if no document is found, if the document does not pass the schema, or if an error occurs.'], info: [] },
    { name: 'Storage', method: 'updateOneById', params: ['storage: a storage object or the name of a storage object.', 'string: the document id.', 'object: the new document.'], returns: ['document: the updated document.', 'null: if no document is found, if the document does not pass the schema, or if an error occurs.'], info: [] },

    { name: 'Request', method: 'get', params: ['request: a request or the name of a request configuration.'], returns: ['request: the request configuration.', 'null: if no request.'], info: [] },
    { name: 'Request', method: 'send', params: ['request: a request or the name of a request configuration.'], returns: ['object | any: the response body.', 'null: if no request or if an error occurs in sending the request.'], info: ['This app sends (awaits) a request. The workflow will resume once the request has completed.'] },
    { name: 'Request', method: 'clearHeaders', params: ['request: a request or the name of a request configuration.'], returns: [], info: [] },
    { name: 'Request', method: 'clearParameters', params: ['request: a request or the name of a request configuration.'], returns: [], info: [] },
    { name: 'Request', method: 'clearBodyForm', params: ['request: a request or the name of a request configuration.'], returns: [], info: [] },
    { name: 'Request', method: 'addHeader', params: ['request: a request or the name of a request configuration.', 'string: the header key.', 'string: the header value.'], returns: [], info: [] },
    { name: 'Request', method: 'addParameter', params: ['request: a request or the name of a request configuration.', 'string: the parameter key.', 'string: the parameter value.'], returns: [], info: [] },
    { name: 'Request', method: 'addBodyForm', params: ['request: a request or the name of a request configuration.', 'string: the body form key.', 'string: the body form value.'], returns: [], info: [] },
    { name: 'Request', method: 'setAction', params: ['request: a request or the name of a request configuration.', 'string: the action.'], returns: [], info: [] },
    { name: 'Request', method: 'setUrl', params: ['request: a request or the name of a request configuration.', 'string: the url.'], returns: [], info: [] },
    { name: 'Request', method: 'setContentType', params: ['requestsetContentType: a request or the name of a request configuration.', 'string: the content type.'], returns: [], info: [] },
    { name: 'Request', method: 'setBodyText', params: ['request: a request or the name of a request configuration.', 'string: the body text.'], returns: [], info: [] },
    { name: 'Request', method: 'setBodyJson', params: ['request: a request or the name of a request configuration.', 'object: the body json.'], returns: [], info: [] },
    { name: 'Request', method: 'setAuthorizationType', params: ['request: a request or the name of a request configuration.', 'string: the authorization type.'], returns: [], info: [] },
    { name: 'Request', method: 'setBearerToken', params: ['request: a request or the name of a request configuration.', 'string: the bearer token.'], returns: [], info: [] },
    { name: 'Request', method: 'setBasicAuthUsername', params: ['request: a request or the name of a request configuration.', 'string: the basic auth username.'], returns: [], info: [] },
    { name: 'Request', method: 'setBasicAuthPassword', params: ['request: a request or the name of a request configuration.', 'string: the basic auth password.'], returns: [], info: [] },
    { name: 'Request', method: 'setApiKey', params: ['request: a request or the name of a request configuration.', 'string: the api key key.'], returns: [], info: [] },
    { name: 'Request', method: 'setApiKeyValue', params: ['request: a request or the name of a request configuration.', 'string: the api key value.'], returns: [], info: [] },
    { name: 'Request', method: 'setApiKeyPassBy', params: ['request: a request or the name of a request configuration.', 'string: the api key pass by value.'], returns: [], info: [] },

    { name: 'Workflow', method: 'comment', params: [], returns: [], info: ['Inserts a comment row.'] },
    { name: 'Workflow', method: 'if', params: ['condition: a value or values to be determined as true or false.'], returns: [], info: [] },
    { name: 'Workflow', method: 'ifElse', params: ['condition: a value or values to be determined as true or false.'], returns: [], info: [] },
    { name: 'Workflow', method: 'forArray', params: ['simpleVariable: the name of the iterating element.', 'array: an array or the name of an array function.', 'simpleVariable: the index (returns a number).'], returns: [], info: [] },
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
