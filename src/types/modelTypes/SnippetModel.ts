import SnippetLanguageModel from 'types/modelTypes/SnippetLanguageModel';
export class SnippetModel {
  id: string;
  SnippetName: string;
  SnippetLanguage: SnippetLanguageModel;
  SnippetPrefix: string;
  SnippetBody: string;
  SnippetDescription: string;
}

export default SnippetModel;
