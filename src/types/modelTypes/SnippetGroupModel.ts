import SnippetModel from './SnippetModel';
const UUID = require('uuid/v4');

export class SnippetGroupModel {
  id: string;
  SnippetGroupName: string;
  SnippetGroupLanguage: string;
  SnippetGroupDescription: string;
  Snippets: SnippetModel[];

  constructor() {
    this.id = UUID();
    this.SnippetGroupName = '';
    this.SnippetGroupLanguage = '';
    this.SnippetGroupDescription = '';
    this.Snippets = new Array<SnippetModel>();
  }
}

export default SnippetGroupModel;
