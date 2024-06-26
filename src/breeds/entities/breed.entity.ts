import { Cat } from "src/cats/entities/cat.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {

    @Column({primary:true, generated:true})
    id:number;
    
    @Column()
    name:string;

    @DeleteDateColumn()
    delete_at: Date;

    @OneToMany(() =>Cat, (cat) =>cat.breed)
    cats: Cat[];
}
