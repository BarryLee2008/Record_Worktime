import {Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn} from 'typeorm'
import { User } from 'db/entities/user'

@Entity({name:'accounts'})
export class Account{
    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    email?:string

    @Column()
    password?:string

    @OneToOne(()=>User,{
        cascade:true
    })
    @JoinColumn({name:'user_id'})
    user?:User

}