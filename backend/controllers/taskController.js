import Task from "../models/taskModel.js";

export const createTask = async (req, res) =>{
    try{
        const {title, description, priority, dueDate, completed} = req.body;
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            completed: completed === true || completed === 'Yes' ? true : false,
            owner: req.userId
        });

        const saved = await task.save();
        res.status(201).json({success: true, task: saved});

    }
    catch(err){
    res.status(400).json({success: false, message: err.message});
    }
}

//get all tasks for logged in user
export const getTasks = async (req, res) =>{
    try{
        const tasks = await Task.find({owner: req.userId}).sort({createdAt: -1});
        res.status(200).json({success: true, tasks});
    }
    catch(err){
        res.status(500).json({success: false, message: err.message});
    }

}
//get single task by id
export const getTaskById = async (req, res) =>{
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.userId});
        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }
        res.status(200).json({success: true, task})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message});
    }

}

//update task
export const updateTask = async (req, res) =>{
    try{
        const data = {...req.body};
        if(data.completed !== undefined){
            data.completed = data.completed === 'Yes' || data.completed === true;
        }
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id,
            owner: req.userId},
            data,
            {new: true, runValidators:true}
        );
        if(!task) return res.status(404).json({success:false, message: "Task not found or yours"});
        res.json({success: true, task});
    }
    catch(err){
        return res.status(400).json({success: false, message: err.message});
        
    }
}

//delete a task

export const deleteTask = async (req, res) =>{
    try {
        const deleted = await Task.findOneAndDelete({_id: req.params.id, owner: req.userId});

        if(!deleted) return res.status(404).json({success: false, message:"Task not deleted or not found"});
        res.json({success: true, message: "Task deleted successfully"});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
        
    }
}