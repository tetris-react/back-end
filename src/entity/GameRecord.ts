import { User } from './User';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import moment from 'moment';

@ObjectType()
@Entity()
export class GameRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('int')
  score: number;

  @Field()
  @Column('int')
  level: number;

  @Field()
  @Column('int')
  lines: number;

  @Field()
  @Column('int')
  time: number; // represented as total seconds

  @Field()
  @Column('timestamp')
  date: string;

  @Field()
  @Column('text')
  tzName: string;

  @Field()
  @Column('text')
  tzAbv: string;

  @Field()
  @Column('int', { default: 0 })
  numTetris: number;

  @Field()
  @Column('decimal', { default: 0 })
  tetrisRate: number;

  @Field()
  @Column('decimal', { default: 0 })
  attackPerSecond: number;

  @Field()
  @Column('decimal', { default: 0 })
  attackPerMinute: number;

  @Field()
  @Column('decimal', { default: 0 })
  processedPerSecond: number;

  @Field()
  @Column('decimal', { default: 0 })
  processedPerMinute: number;

  @Field()
  @Column({ default: false })
  isPrivate: boolean;

  @Column('text') userId: string;

  @Field(() => User)
  async user(@Root() parent: GameRecord): Promise<User | undefined> {
    return await User.findOne({
      where: { id: parent.userId }
    });
  }
}
