import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./users.entitie";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 15 })
  cep: string;

  @Column({ type: "varchar", length: 55 })
  state: string;

  @Column({ type: "varchar", length: 55 })
  city: string;

  @Column({ type: "varchar", length: 55 })
  street: string;

  @Column({ type: "varchar", length: 55 })
  complement: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updated_at: Date | string;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn()
  user: User;
}

export { Address };
