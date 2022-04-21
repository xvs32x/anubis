import { DynamicModule, Module } from '@nestjs/common';
import { GithubService } from './facades/github/github.service';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { GitModule } from '../git/git.module';
import { GithubInstanceService } from './services/github-instance/github-instance.service';
import { LoggerModule } from '../logger/logger.module';
import { GithubOwnerProvider } from './providers/github-owner';
import { GithubRepoProvider } from './providers/github-repo';

@Module({})
export class GithubModule {
  static withConfig(providers: Provider[] = []): DynamicModule {
    return {
      module: GithubModule,
      exports: [GithubService],
      imports: [GitModule.withConfig(providers), LoggerModule],
      providers: [
        GithubService,
        GithubInstanceService,
        GithubOwnerProvider,
        GithubRepoProvider,
        ...providers,
      ],
    };
  }
}
