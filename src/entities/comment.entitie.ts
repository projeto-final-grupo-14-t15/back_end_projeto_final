// Comment.ts
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   JoinColumn,
} from "typeorm";
import { User } from "./users.entitie";
import { Announcement } from "./announcements.entitie";

@Entity("comments")
class Comment {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: "varchar", length: 255 })
   text: string;

   @ManyToOne(() => User)
   @JoinColumn({ name: "author_id" })
   author: User;

   @ManyToOne(() => Announcement, (announcement) => announcement.comments)
   @JoinColumn({ name: "announcement_id" })
   announcement: Announcement;

   @CreateDateColumn({ type: "date" })
   publication_date: Date | string;

   @UpdateDateColumn({ type: "date" })
   update_date: Date | string;
}

export { Comment };
