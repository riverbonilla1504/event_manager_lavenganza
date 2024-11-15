import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: false })
  attendanceConfirmed1: boolean;

  @Column({ default: false })
  attendanceConfirmed2: boolean;

  @Column({ default: false })
  attendanceConfirmed3: boolean;
  
}
