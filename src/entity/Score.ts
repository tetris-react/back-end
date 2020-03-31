import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class Score extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("int")
  value: number;

  @Field()
  @Column("int")
  level: number;

  @Field()
  @Column("int")
  rowsCleared: number;

  @Field()
  @Column({ default: false })
  isPrivate: boolean;

  @Column("text")
  userId: string;

  @Field(() => User)
  async user(@Root() parent: Score) {
    return await User.findOne({
      where: { id: parent.userId },
    });
  }
}
