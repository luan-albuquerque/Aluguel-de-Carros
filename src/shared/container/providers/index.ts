import { container } from "tsyringe";
import { iDateProvider } from "./DateProvider/iDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";
import { iMailProvider } from "./MailProvider/iMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<iDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);

container.registerInstance<iMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);


container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  S3StorageProvider
)