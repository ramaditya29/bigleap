import { Module } from '@nestjs/common';
import { DBController } from './db.controller';
import { DBService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
/*import { Todo, TodoSchema } from './schema/Todo.schema';*/
import { UserProfile, UserProfileSchema } from './schema/UserProfile.schema';
const DB_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "mongodb://localhost/bigleap_ai";
@Module({
  imports: [MongooseModule.forRoot(DB_URL ),
            MongooseModule.forFeature([{ name: UserProfile.name, schema: UserProfileSchema, collection: 'user_profile' }])],
  controllers: [DBController],
  providers: [DBService],
})
export class DBModule {}
