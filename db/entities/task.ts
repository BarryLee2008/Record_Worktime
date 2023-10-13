import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './user'
@Entity({name:'tasks'})
export class Task{
    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    start_time?:string

    @Column()
    end_time?:string

    @Column()
    location?:string

    @Column({type:'float'})
    total_worktime?:number

    @Column()
    timer_id?:number

    @ManyToOne(()=>User, (user)=>user.tasks,{
        cascade:true
    })
    @JoinColumn({name:'user_id'})
    user?:User
}