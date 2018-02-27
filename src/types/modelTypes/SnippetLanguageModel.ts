import SnippetModel from './SnippetModel';
const UUID = require('uuid/v4');

export class SnippetLanguageModel {
  id: string;
  SnippetLanguageName: string;
  SnippetLanguageDescription: string;
  Snippets: SnippetModel[];

  constructor() {
    this.id = UUID();
    this.SnippetLanguageName = '';
    this.SnippetLanguageDescription = '';
    this.Snippets = new Array<SnippetModel>();
  }
}

export default SnippetLanguageModel;
