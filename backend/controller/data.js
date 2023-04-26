import * as dataRepository from '../data/data.js';
import { socketIO } from '../app.js';

// GET /data
export async function getData(req, res){
    const data = await dataRepository.getAll();
    res.status(200).json(data);
}

// POST /feed
export async function updateData(req, res){
    const { flow_meter, water_press, motor_working, system_warning } = req.body;
    await dataRepository.update( flow_meter, water_press, motor_working, system_warning );
    const data = req.body;
    socketIO.clients.forEach((client) => {
        client.send(JSON.stringify(data)); // 소켓으로 데이터 보내기
    });
    res.status(201).json(data);
}