import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../database/entities/base.entity";

@Entity('sliders')
export class Slider extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @Column({ type: 'boolean', default: true })
    isActive?: boolean;


}
