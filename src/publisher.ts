import { RemotesToShellModule } from './modules/presets/remotes-to-shell/remotes-to-shell.module';
import { SafeModeToken } from './modules/config/safe-mode';
import { ShellToken } from './modules/presets/remotes-to-shell/models/shell';
import { Application } from './models/application';
import { runPreset } from './main/console';
import { RemotesToken } from './modules/presets/remotes-to-shell/models/remotes';

runPreset(
  RemotesToShellModule.withConfig([
    {
      provide: SafeModeToken,
      useFactory: () => {
        return true;
      },
    },
    {
      provide: ShellToken,
      useValue: <Application>{
        name: 'shell',
        path: ['src/examples/remotes-to-shell/shell'],
      },
    },
    {
      provide: RemotesToken,
      useValue: <Application[]>[
        {
          name: 'remote1',
          path: ['src/examples/remotes-to-shell/remote1'],
        },
        {
          name: 'remote2',
          path: ['src/examples/remotes-to-shell/remote2'],
        },
      ],
    },
  ]),
);
