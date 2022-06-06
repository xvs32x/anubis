import * as Https from 'https';
import { RequestOptions } from 'https';
import { injectable } from '../injector/injectable';
import { JsonService } from '../json/json.service';

@injectable()
export class HttpService {
  constructor(protected jsonService: JsonService) {}
  get<T>(options: RequestOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      const request = Https.request(options, (response) => {
        let body = '';
        response.on('data', (data) => {
          body += data;
        });
        response.on('end', () => {
          resolve(this.jsonService.parse<T>(body));
        });
        response.on('error', (error) => {
          reject(error);
        });
      });
      request.end();
    });
  }
}
