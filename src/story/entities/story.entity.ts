import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../database/entities/base.entity";
import { User } from "../../modules/user/entities/user.entity";
@Entity("stories")
export class Story extends BaseEntity {
  @Column(
    {
      type: 'varchar',
      length: 255,
    }
  )
  title: string;

  @Column(
    {
      type: 'varchar',
      nullable: false,
    }
  )
  content: string;

  @Column(
    {
      type: 'int',
      nullable: false,
    }
  )
  farmerId: number;

  @OneToOne(() => User, (farmer) => farmer.story, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'farmerId',
  })
  farmer: User;

}
