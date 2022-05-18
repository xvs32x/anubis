import { injectable } from '../../../core/injector/injectable';

@injectable()
export class GithubConfig {
  token: string;
  owner: string;
  repo: string;
}
