import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
