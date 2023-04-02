import * as dataRepository from '../data/data.js';

// GET /data
export async function getData(req, res){
    const data = await dataRepository.getAll();
    res.status(200).json(data);
}

// POST /feed
export async function updateData(req, res){
    const { flow_meter, water_press, motor_working, system_warning } = req.body;
    const data = await dataRepository.update( flow_meter, water_press, motor_working, system_warning );
    res.status(201).json(data);
}