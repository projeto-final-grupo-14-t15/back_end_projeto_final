import {
   BeforeInsert,
   BeforeUpdate,
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./address.entitie";
import { User } from "./users.entitie";
import { Photo } from "./photos.entitie";

@Entity("announcements")
class Announcement {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column({ type: "varchar", length: 55 })
   brand: string;

   @Column({ type: "varchar", length: 255 })
   description: string;

   @Column({ type: "varchar", length: 55 })
   model: string;

   @Column({ type: "varchar", length: 4 })
   year: string;

   @Column({ type: "decimal" })
   km: number;

   @Column({ type: "varchar", length: 55 })
   fuel: string;

   @Column({ type: "varchar", length: 55 })
   color: string;

   @Column({ type: "boolean" })
   higherThanFipe: boolean;

   @Column({ type: "boolean", default: true  })
   isActive: boolean;

   @Column({ type: "decimal" })
   price: number;

   @CreateDateColumn({ type: "date" })
   createdAt: Date | string;

   @UpdateDateColumn({ type: "date" })
   updatedAt: Date | string;

   @ManyToOne(() => User, (user) => user.announcements)
   @JoinColumn({ name: "user_id" })
   user: User;

   @OneToMany(() => Photo, (photo) => photo.announcement, { cascade: true })
   photos: Photo[];
}

export { Announcement };
