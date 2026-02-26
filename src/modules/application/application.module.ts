import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { NotificationModule } from './notification/notification.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    NotificationModule,
    ContactModule,
    FaqModule,
    TaskModule,
  ],
})
export class ApplicationModule {}
