import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

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
  public: boolean;

  @Field(() => User)
  user: User;
}
