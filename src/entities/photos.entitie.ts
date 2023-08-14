import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./address.entitie";
import { User } from "./users.entitie";
import { Announcement } from "./announcements.entitie";

@Entity("photos")
class Photo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255 })
  link: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @ManyToOne(() => Announcement, (announcement) => announcement.photos)
  @JoinColumn({ name: "announcement_id" })
  announcement: Announcement;
}

export { Photo };
