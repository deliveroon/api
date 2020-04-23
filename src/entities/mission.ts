import { Entity, Column, PrimaryGeneratedColumn, ManyToMany,ManyToOne, JoinColumn, JoinTable, OneToOne, OneToMany } from 'typeorm';
import { Article } from './article';
import { Statut } from './statut';
import { MissionArticles } from './missionArticles';
import { type } from 'os';
import { User } from './user';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Statut)
  @JoinColumn()
  statut: number;

  @Column()
  gps: string;

  @Column()
  token: string;

  @Column( {nullable: true } )
  livreur: number;

}