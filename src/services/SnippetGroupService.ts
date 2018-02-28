import delay from './delay'; // For testing async call. Set to 0 on prod.
import { BaseUrl } from '../app.settings';
import axios, { AxiosResponse } from 'axios';
import { SnippetGroupModel } from '../types/modelTypes/SnippetGroupModel';

let httpRequest = axios.create({
  baseURL: BaseUrl,
  timeout: 1000
});

class SnippetGroupService {
  static ServiceEndPoint = 'SnippetGroup';

  static getAllSnippetGroup() {
    return new Promise<SnippetGroupModel[]>(
      (resolve, reject) => {
        setTimeout(() => {
          httpRequest.get(this.ServiceEndPoint).then((res: AxiosResponse) => resolve(res.data));
        }, delay);
      });
  }

  static addNewSnippetGroup(SnippetGroup: SnippetGroupModel): Promise<SnippetGroupModel> {
    SnippetGroup = Object.assign({}, SnippetGroup); // To avoid manipulating object passed in
    let result: Promise<SnippetGroupModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.post(this.ServiceEndPoint, SnippetGroup).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }

  static updateSnippetGroup(SnippetGroup: SnippetGroupModel): Promise<SnippetGroupModel> {
    const SnippetGroupEndPoint = `${this.ServiceEndPoint}/${SnippetGroup.id}`;
    SnippetGroup = Object.assign({}, SnippetGroup); // To avoid manipulating object passed in
    let result: Promise<SnippetGroupModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.put(SnippetGroupEndPoint, SnippetGroup).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }

  static deleteSnippetGroup(SnippetGroup: SnippetGroupModel): Promise<SnippetGroupModel> {
    const SnippetGroupEndPoint = `${this.ServiceEndPoint}/${SnippetGroup.id}`;
    let result: Promise<SnippetGroupModel> = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpRequest.delete(SnippetGroupEndPoint).then((res: AxiosResponse) => {
          return resolve(res.data);
        });
      }, delay);
    });
    return result;
  }
}

export default SnippetGroupService;
