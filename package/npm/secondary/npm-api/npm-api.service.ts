import { injectable } from '../../../core/injector/injectable';
import { PackageInfo } from '../models/package-info.model';
import { Application } from '../../../core/anubis/application.model';
import { TerminalService } from '../../../core/terminal/terminal.service';
import { GitApiService } from '../../../git/secondary/git-api/git-api.service';
import { GitSemverService } from '../../../git/secondary/git-semver/git-semver.service';
import * as NpmApi from 'npm-api';
import { ReporterService } from '../../../core/reporter/reporter.service';
import { JsonService } from '../../../core/json/json.service';

@injectable()
export class NpmApiService {
  protected npmApi;
  constructor(
    protected terminalService: TerminalService,
    protected gitApiService: GitApiService,
    protected gitSemverService: GitSemverService,
    protected reporterService: ReporterService,
    protected jsonService: JsonService,
  ) {}
  async publish(app: Application) {
    const workingDir = this.getWorkingDir(app);
    const lastTag = await this.gitApiService.getLastTag(app);
    const versionToPublish = this.gitSemverService.convertTagToVersion(lastTag);
    const packageName = this.getPackageName(app);
    const packageVersion = this.getPackageVersion(app);
    const isExist = await this.checkVersionExists('webpack', '1.0.0');
    console.log(isExist);
    // axios
    //   .get('https://example.com/todos')
    //   .then(res => {
    //     console.log(`statusCode: ${res.status}`);
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // const info = await this.httpService.get({
    //   hostname: 'api.npms.io',
    //   port: 443,
    //   path: '/v2/package/react',
    //   method: 'GET',
    // });
    // console.log(info);
    // const isPublished = await this.getAppAlreadyPublished(app);
    // if (!isPublished) {
    //   await this.terminalService.runCommand([
    //     `cd ${workingDir}`,
    //     `npm version ${versionToPublish} --allow-same-version --git-tag-version=false`,
    //     `npm publish`,
    //   ]);
    // }
  }
  async getAppAlreadyPublished(app: Application): Promise<boolean> {
    const packageName = this.getPackageName(app);
    const packageVersion = this.getPackageVersion(app);
    try {
      const repo = await this.getInstance().repo(packageName);
      const version = await repo.version(packageVersion);
      return !!version.name;
    } catch (e) {
      this.reporterService.shutdown(e);
    }
  }
  async checkVersionExists(
    packageName: string,
    packageVersion: string,
  ): Promise<boolean> {
    try {
      const response: string = await this.terminalService.exec(
        `npm view ${packageName} versions  --json`,
        { silent: true },
      );
      const availableVersions = this.jsonService.parse<string[]>(response, []);
      return !!availableVersions.find((version) => version === packageVersion);
    } catch (e) {
      this.reporterService.shutdown(
        'Can not get package %s from npm. Please check if it exists',
        packageName,
      );
    }
  }
  getWorkingDir(app: Application): string {
    return app.distPath ? app.distPath : app.path[0];
  }
  getPackageName(app: Application): string {
    return this.getPackageInfo(app).name;
  }
  getPackageVersion(app: Application): string {
    return this.getPackageInfo(app).version;
  }
  protected getPackageInfo(app: Application): PackageInfo {
    return require(`${app.path}/package.json`);
  }
  getInstance() {
    if (this.npmApi) {
      return this.npmApi;
    }
    this.npmApi = new NpmApi();
    return this.npmApi;
  }
}
