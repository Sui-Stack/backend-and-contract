import { ScheduleData } from "../schema/schedule";
import { transfer } from "./contract";

const cron = require('node-cron');

export const schedule = async (data: ScheduleData) => {
    const date = new Date(data.date);
    console.log(date)
    console.log(`* ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth()+1} *`)
    cron.schedule(
        `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth()+1} *`, 
        async (date: Date) => {
            console.log(`Transfer at ${date}`)
            const result = await transfer(data.recipient, data.amount);
            console.log(`Transfer at ${date} \nTransfer result:`, result)
        }
    )

}