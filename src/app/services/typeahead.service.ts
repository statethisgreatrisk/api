import { Injectable } from '@angular/core';
import { Schema } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeaheadService {

  zod: any = {
    'za': {
      'string()': {
        'min()': {},
        'max()': {},
      },
      'number()': {
        'min()': {},
        'max()': {},
      }
    },
    'zz': {
      'string()': {
        'min()': {},
        'max()': {},
      },
      'number()': {
        'min()': {},
        'max()': {},
      }
    },
  };

  constructor() {}

  objectPaths: (object: any, prefix?: string) => string[] = (object: any, prefix = '') => {
    const paths = [];

    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const path = prefix ? `${prefix}.${key}` : key;
  
        paths.push(path);
  
        if (typeof object[key] === 'object' && object[key] !== null) {
          paths.push(...this.objectPaths(object[key], path));
        }
      }
    }
  
    return paths;
  }

  levelPaths(level: number, paths: string[]) {
    const options: string[] = [];

    for (const path of paths) {
      const split = path.split('.');
      const option = split[level];

      if (!options.includes(option)) options.push(option);
    }

    return options;
  }

  matchPath(type: string, paths: string[]): boolean {
    for (const path of paths) {
      if (path.startsWith(type)) return true;
    }

    return false;
  }

  determineZod(schema: Schema, index: number) {
    const type = schema.rows[index].type;
    const placeholderIndex = schema.rows[index].placeholderIndex;
    const paths = this.objectPaths(this.zod);

    if (type && type.includes(' ')) return;
    if (type && !this.matchPath(type, paths)) return;

    if (!type) {
      const options = this.levelPaths(0, paths);
      
      let newPlaceholderIndex = Number.isInteger(placeholderIndex) ? Number(placeholderIndex) + 1 : 0;
      newPlaceholderIndex = newPlaceholderIndex === options.length ? 0 : newPlaceholderIndex;

      schema.rows[index].placeholder = options[newPlaceholderIndex];
      schema.rows[index].placeholderIndex = newPlaceholderIndex;

      return;
    }

    const level = [...type].reduce((acc, char) => (char === '.' ? acc + 1 : acc), 0);
    const options = this.levelPaths(level, paths);
    const levelType = type.split('.')[level] || '';

    let newPlaceholderIndex = Number.isInteger(placeholderIndex) ? Number(placeholderIndex) + 1 : 0;
    newPlaceholderIndex = newPlaceholderIndex === options.length ? 0 : newPlaceholderIndex;

    schema.rows[index].placeholder = options[newPlaceholderIndex].startsWith(levelType) ? options[newPlaceholderIndex].substring(levelType.length) : options[newPlaceholderIndex];
    schema.rows[index].placeholderIndex = newPlaceholderIndex;
  }

  completeZod(schema: Schema, index: number) {
    const placeholder = schema.rows[index].placeholder;

    if (!placeholder) return;
    
    schema.rows[index].type = schema.rows[index].type + schema.rows[index].placeholder;
    schema.rows[index].placeholder = '';
    schema.rows[index].placeholderIndex = -1;
    return;
  }

}
