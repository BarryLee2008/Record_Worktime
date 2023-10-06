import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {Task} from 'db/entities/task'
@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    address?:string

    @Column()
    mobile?:number

    @Column()
    status?:number

    @Column()
    fullname?:string

    @OneToMany(()=>Task,(task)=>task.user)
    tasks?:Task[]

   
}