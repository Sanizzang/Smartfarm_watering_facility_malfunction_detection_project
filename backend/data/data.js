import { db } from '../db/database.js';

// GET /data
export async function getAll(){
    return db.execute('SELECT * FROM data ORDER BY id DESC LIMIT 1')
    .then(result => result[0][0]);
}

// POST /data
export async function update(flow_meter, water_press, motor_working, system_warning){
    return db
        .execute('INSERT INTO data (flow_meter, water_press, motor_working, system_warning, createdAt) VALUES(?,?,?,?,?)', [
            flow_meter, 
            water_press, 
            motor_working, 
            system_warning,
            new Date()
        ])
        .then(result => result[0][0]);
}