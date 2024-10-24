import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ConfirmationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  code: string;

  @Column({ default: false })
  confirmed: boolean;
}
