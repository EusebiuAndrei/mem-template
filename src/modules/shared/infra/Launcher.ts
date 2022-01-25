import { LOGGER_SYMBOL } from './../application/logger/ILogger';
import ILogger from '../application/logger/ILogger';
import { BaseLauncher, ExpressIocSetup, MemIocSetup } from '@eusebiu_gagea/mem';
import Server from './Server';
import path from 'path';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import models from './db/typeorm/schemas';
import IEmailService from '../application/email/IEmalService';
import EmailService from './email/EmailService';
import logger from './logger/Logger';

class Launcher extends BaseLauncher {
  public async setup(): Promise<void> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, { entities: models });
    const connection = await createConnection(connectionOptions);
    this.container.bind<Connection>(Connection).toDynamicValue(() => connection);

    this.container.bind<IEmailService>(EmailService).toDynamicValue(() => new EmailService());
    this.container.bind<ILogger>(LOGGER_SYMBOL).toDynamicValue(() => logger);

    // Add IocSetup from your modules
    // EX await UsersIocSetup(this.container);

    await MemIocSetup(this, { rootDirectory: path.join(__dirname, '..', '..', '..', 'modules') });
    await ExpressIocSetup(this, Server, { rootDirectory: path.join(__dirname, '..', '..', '..') });
  }
}

export default Launcher;
