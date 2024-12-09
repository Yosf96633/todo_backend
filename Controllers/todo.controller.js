import { todoModel } from "../Models/todoModel.js";
export const AddTodo = async (req, res) => {
  try {
    const { id, name, email } = req.user;
    const { title } = req.body;
    if (!title)
      return res
        .status(400)
        .json({ message: `Task should be added`, success: false });
    const todo = await todoModel.findOneAndUpdate(
      { userID: id },
      {
        $push: {
          tasks: { title, status: false },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(200).json({ message: `ToDo added`, todo, success: true });
  } catch (error) {
    console.log(`Error in AddTodo ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
export const GetTodo = async (req, res) => {
  try {
    const { id, name, email } = req.user;
    const data = await todoModel.findOne({ userID: id });
    if (!data) {
      return res
        .status(400)
        .json({ message: `No To-do found`, success: false });
    }
    return res
      .status(200)
      .json({ message: `To-dos found`, data, success: true });
  } catch (error) {
    console.log(`Error in GetTodo ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal server error`, success: false });
  }
};
export const ToggleTodo = async (req, res) => {
  try {
    const { todoID } = req.params;
    const { id: userID } = req.user; // Ensure `req.user` is populated by middleware
    
    // Fetch the user's todos
    const data = await todoModel.findOne({ userID });
    if (!data) {
      return res.status(400).json({ message: 'No tasks found', success: false });
    }

    // Find the specific task
    const task = data.tasks.find(t => t._id.toString() === todoID);
    if (!task) {
      return res.status(404).json({ message: 'Task not found', success: false });
    }

    // Toggle the task's status
    task.status = !task.status;

    // Save the updated parent document
    await data.save();
    return res.status(200).json({ message: 'Task updated successfully', task, success: true });
  } catch (error) {
    console.error(`Error in ToggleTodo: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};
export const DeleteTodo = async (req , res) => {
   try {
    const {todoID} = req.params;
    const {id } = req.user;
    if(!todoID)
      return res.status(400).json({message:`Enter valid task id` , success:false});
    const data = await todoModel.findOne({userID:id});
    if(!data)
      return res.status(400).json({message:`No tasks found` , success:false});
    const filterTodo = data.tasks.filter((_ , i)=>_._id.toString()!==todoID);
    if(data.tasks.length === filterTodo.length)
      return res.status(400).json({ message: 'No todo found', success: false });
    data.tasks = filterTodo;
    await data.save();
    return res.status(200).json({ message: 'Task deleted successfully' , data , success: true });
   } catch (error) {
     console.error(`Error in DeleteTodo: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error', success: false });
   }
}


