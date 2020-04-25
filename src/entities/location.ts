import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;
}