import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  role: string;

  @Column({ default: new Date(), type: 'date' })
  created_at: Date;

  @Column()
  email: string;

  @Column()
  password: string;
}
