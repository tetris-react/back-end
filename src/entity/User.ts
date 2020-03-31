import { Score } from "./Score";
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

  @Field(() => [Score])
  async scores(@Root() parent: User): Promise<Array<Score>> {
    const scores = await Score.find({
      where: { userId: parent.id },
    });

    return scores.sort((a, b) => b.value - a.value);
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
  admin: boolean;

  @Column()
  password: string;
}
