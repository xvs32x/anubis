import { AppModule } from './main/app.module';
import { run } from './main/console';
import { ManyToOneModule } from './modules/presets/many-to-one/many-to-one.module';

run(AppModule.configurePreset(ManyToOneModule));
