import { Injectable } from '@angular/core';
import { Validator } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorTypeaheadService {

  paths = [
    'isAlpha()', 'isAlphanumeric()', 'isBoolean()', 'isEmail()',
    'isFloat()', 'isInt()', 'isLowercase()', 'isMongoId()', 'isUppercase()',
    'isURL()', 'isUUID()',
  ];

  remainingPaths(validation: string) {
    const validationSplit = validation.split('.');
    const paths: string[] = this.paths.filter((path) => !validationSplit.includes(path));

    return paths;
  }

  matchPath(validation: string): boolean {
    if (validation === '.') return true;

    const validationSplit = validation.split('.').filter((validation) => !!validation);
    const validations: boolean[] = [];

    for (const validation of validationSplit) {
      let match = false;

      for (const path of this.paths) {
        if (path.startsWith(validation)) match = true;
      }

      validations.push(match);
    }

    return validations.every((validation) => validation === true);
  }

  constructor() {}

  determine(validator: Validator) {
    const validation = validator.validation;
    const placeholderIndex = validator.placeholderIndex;

    if (validation && validation.includes(' ')) return;
    if (validation && !this.matchPath(validation)) return;

    if (!validation) {
      const options = this.remainingPaths(validation);
      
      let newPlaceholderIndex = Number.isInteger(placeholderIndex) ? Number(placeholderIndex) + 1 : 0;
      newPlaceholderIndex = newPlaceholderIndex === options.length ? 0 : newPlaceholderIndex;

      validator.placeholder = '.' + options[newPlaceholderIndex];
      validator.placeholderIndex = newPlaceholderIndex;

      return;
    }

    const lastMostValidationSplit = validation.split('.').length;
    const lastMostValidation = validation.split('.')[lastMostValidationSplit - 1];

    let options = this.remainingPaths(validation).filter((path) => path.startsWith(lastMostValidation));

    if (!options.length) return;

    let newPlaceholderIndex = Number.isInteger(placeholderIndex) ? Number(placeholderIndex) + 1 : 0;
    newPlaceholderIndex = newPlaceholderIndex === options.length ? 0 : newPlaceholderIndex;

    validator.placeholder = options[newPlaceholderIndex].startsWith(lastMostValidation) ? options[newPlaceholderIndex].substring(lastMostValidation.length) : options[newPlaceholderIndex];
    validator.placeholderIndex = newPlaceholderIndex;
  }

  complete(validator: Validator) {
    const placeholder = validator.placeholder;

    if (!placeholder) return;
    
    validator.validation = validator.validation + validator.placeholder;
    validator.placeholder = '';
    validator.placeholderIndex = -1;
  }

}
