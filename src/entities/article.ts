import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { Mission } from './mission';


@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "60000" })
  photo: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  disponibility: boolean;

  quantity: number;

  


}