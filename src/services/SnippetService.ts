import delay from './delay'; // For testing async call. Set to 0 on prod.
import { BaseUrl } from '../app.settings';
import axios, { AxiosResponse } from 'axios';
import { SnippetModel } from '../types/modelTypes/SnippetModel';

let httpRequest = axios.create({
  baseURL: BaseUrl,
  timeout: 1000
});

class SnippetService {
  static ServiceEndPoint = 'Snippet';

  static getAllSnippet() {
    return new Promise<SnippetModel[]>(
      (resolve, reject) => {
        setTimeout(() => {
          httpRequest.get(this.ServiceEndPoint).then((res: AxiosResponse) => resolve(res.data));
        }, delay);
      });
  }

  static addNewSnippet(Snippet: SnippetModel): Promise<SnippetModel> {
    Snippet = Object.assign({}, Snippet); // To avoid manipulating object passed in
    let result: Promise<SnippetModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.post(this.ServiceEndPoint, Snippet).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }

  static updateSnippet(Snippet: SnippetModel): Promise<SnippetModel> {
    const SnippetEndPoint = `${this.ServiceEndPoint}/${Snippet.id}`;
    Snippet = Object.assign({}, Snippet); // To avoid manipulating object passed in
    let result: Promise<SnippetModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.put(SnippetEndPoint, Snippet).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }

  static deleteSnippet(Snippet: SnippetModel): Promise<SnippetModel> {
    const SnippetEndPoint = `${this.ServiceEndPoint}/${Snippet.id}`;
    let result: Promise<SnippetModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.delete(SnippetEndPoint).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }
}

export default SnippetService;
