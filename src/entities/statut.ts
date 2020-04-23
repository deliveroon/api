import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Statut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}