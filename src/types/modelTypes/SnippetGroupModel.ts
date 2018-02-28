import SnippetModel from './SnippetModel';
const UUID = require('uuid/v4');

export class SnippetGroupModel {
  id: string;
  SnippetGroupName: string;
  SnippetLanguage: string;
  SnippetGroupDescription: string;
  Snippets: SnippetModel[];

  constructor() {
    this.id = UUID();
    this.SnippetGroupName = '';
    this.SnippetLanguage = '';
    this.SnippetGroupDescription = '';
    this.Snippets = new Array<SnippetModel>();
  }
}

export default SnippetGroupModel;
