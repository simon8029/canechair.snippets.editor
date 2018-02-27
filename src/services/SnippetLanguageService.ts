import delay from './delay'; // For testing async call. Set to 0 on prod.
import { BaseUrl } from '../app.settings';
import axios, { AxiosResponse } from 'axios';
import { SnippetLanguageModel } from '../types/modelTypes/SnippetLanguageModel';

let httpRequest = axios.create({
  baseURL: BaseUrl,
  timeout: 1000
});

class SnippetLanguageService {
  static ServiceEndPoint = 'SnippetLanguage';

  static getAllSnippetLanguage() {
    return new Promise<SnippetLanguageModel[]>(
      (resolve, reject) => {
        setTimeout(() => {
          httpRequest.get(this.ServiceEndPoint).then((res: AxiosResponse) => resolve(res.data));
        }, delay);
      });
  }

  static addNewSnippetLanguage(SnippetLanguage: SnippetLanguageModel): Promise<SnippetLanguageModel> {
    SnippetLanguage = Object.assign({}, SnippetLanguage); // To avoid manipulating object passed in
    let result: Promise<SnippetLanguageModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.post(this.ServiceEndPoint, SnippetLanguage).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }

  static updateSnippetLanguage(SnippetLanguage: SnippetLanguageModel): Promise<SnippetLanguageModel> {
    const SnippetLanguageEndPoint = `${this.ServiceEndPoint}/${SnippetLanguage.id}`;
    SnippetLanguage = Object.assign({}, SnippetLanguage); // To avoid manipulating object passed in
    let result: Promise<SnippetLanguageModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.put(SnippetLanguageEndPoint, SnippetLanguage).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }

  static deleteSnippetLanguage(SnippetLanguage: SnippetLanguageModel): Promise<SnippetLanguageModel> {
    const SnippetLanguageEndPoint = `${this.ServiceEndPoint}/${SnippetLanguage.id}`;
    let result: Promise<SnippetLanguageModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.delete(SnippetLanguageEndPoint).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }
}

export default SnippetLanguageService;
