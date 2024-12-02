import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'output',
  standalone: true
})
export class OutputPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(str: string): SafeHtml | string {
    const prefix = `{"Output":{"response":"`;
    const prefixLength = prefix.length;
    const prefixStartIndex = str.indexOf(prefix);

    if (prefixStartIndex === -1) return '';

    const content = JSON.parse(JSON.stringify(str.slice(prefixStartIndex + prefixLength)));

    const suffix = `","updatedCode":`;
    const suffixStartIndex = content.indexOf(suffix);
    
    if (suffixStartIndex === -1) {
      const replaced = content.replace(/\\n/g, '<br>').replace('<code>', '<pre><code>').replace('</code>', '</code></pre>')
      console.log('replaced', replaced)
      return replaced;
    }

    const html = content.slice(0, suffixStartIndex).replace(/\\n/g, '<br>').replace('<code>', '<pre><code>').replace('</code>', '</code></pre>')
    console.log('replaced html', html)
    
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
