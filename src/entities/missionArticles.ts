import { Entity, Column, PrimaryGeneratedColumn, ManyToMany,ManyToOne, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { Article } from './article';
import { Mission } from './mission';

@Entity()
export class MissionArticles {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mission: number;
  
  @Column()
  article: number;

  @Column()
  quantity: number;


}