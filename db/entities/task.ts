import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './user'
@Entity({name:'tasks'})
export class Task{
    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    start_time?:Date

    @Column()
    end_time?:Date

    @Column()
    location?:string

    @Column()
    total_worktime?:number

    @ManyToOne(()=>User,(user)=>user.tasks,{
        cascade:true
    })
    @JoinColumn({name:'user_id'})
    user?:User
}