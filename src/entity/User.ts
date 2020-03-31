import { GameRecord } from "./GameRecord";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text", { unique: true })
  username: string;

  @Field(() => [GameRecord])
  async records(@Root() parent: User): Promise<GameRecord[]> {
    const records = await GameRecord.find({
      where: { userId: parent.id },
    });

    return records.sort((a, b) => b.score - a.score);
  }

  @Field()
  @Column("text", { default: "USA" })
  country: string;

  @Field()
  @Column("text", { default: "Etc/UTC" })
  tzName: string;

  @Field()
  @Column("text", { default: "UTC" })
  tzAbv: string;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  password: string;
}
