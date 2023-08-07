import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./address.entitie";
import { Announcement } from "./announcements.entitie";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 155, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "boolean", default: false })
  accountType: boolean;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", length: 25 })
  telephone: string;

  @Column({ type: "varchar", length: 15 })
  cpf: string;

  @Column({ type: "date" })
  date_of_birth: Date | string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updated_at: Date | string;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    const password = getRounds(this.password);

    if (!password) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { User };
