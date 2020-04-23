import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usertype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}