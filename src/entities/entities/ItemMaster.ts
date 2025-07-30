import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("index_uid", ["item_code", "uid"], {})
@Index("item_master_pkey", ["uid"], { unique: true })
@Entity("item_master", { schema: "public" })
export class ItemMaster {
  @PrimaryGeneratedColumn({ type: "bigint", name: "uid" })
  uid: string;

  @Column("character", { name: "item_code", nullable: true, length: 254 })
  item_code: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("date", { name: "create_date", nullable: true })
  createDate: string | null;
}
