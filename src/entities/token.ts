import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Country } from './country';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToOne(type => Country)
  @JoinColumn()
  country: number;
}