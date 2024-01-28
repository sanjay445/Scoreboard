
import React, { useState, useEffect } from 'react';
import ActivityMasterService from '../services/ActivityMasterService';
import { Link,useNavigate} from 'react-router-dom';
const Activities = () => {
  const [reportContent, setReportContent] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' , points: '' });
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {


        loadTasks(); 
    
  }, []);

  const loadTasks = async () => {
    const tasksData = await ActivityMasterService.getAllTasks();
    setTasks(tasksData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = async () => {
    await ActivityMasterService.createTask(newTask);
    setNewTask({ name: '', description: '', points: '' });
    loadTasks();
  };

  const deleteTask = async (taskId) => {
    await ActivityMasterService.deleteTask(taskId);
    loadTasks();
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const updateTask = async (taskId) => {
    await ActivityMasterService.updateTask(taskId, editingTask);
    setEditingTask(null);
    loadTasks();
  };
 const logout = () =>{
    sessionStorage.clear();
    navigate('/login');
 }
 const header={display:"flex"}
 const tabs={display:"flex",alignItemss:"center"}
 const logoutBtn ={display:"flex",color:"white",cursor:"pointer",alignItems:"center"}

  return (
    <div>
    <div className="container mt-4">
      <h2 className="mb-4">Activity List</h2>
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-3">
            <div className="card p-4">
              <div className="card-description">
                {editingTask?.id === task.id ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={editingTask.name}
                      onChange={(e) =>
                        setEditingTask((prevTask) => ({
                          ...prevTask,
                          name: e.target.value,
                        }))
                      }
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      name="description"
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask((prevTask) => ({
                          ...prevTask,
                          description: e.target.value,
                        }))
                      }
                      className="form-control mb-2"
                    />
                     <input
                      type="number"
                      name="points"
                      value={editingTask.points}
                      onChange={(e) =>
                        setEditingTask((prevTask) => ({
                          ...prevTask,
                          points: e.target.value,
                        }))
                      }
                      className="form-control mb-2"
                    />
                    <button
                      onClick={() => updateTask(task.id)}
                      className="btn btn-primary mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-name">{task.name}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">Score :{task.points}</p>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn btn-danger mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEditing(task)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card mt-4 p-3">
            <div className="card-description">
              <h3 className="mb-4">Add New Activity Details</h3>
              <input
                type="text"
                name="name"
                value={newTask.name}
                placeholder="Title"
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="description"
                value={newTask.description}
                placeholder="description"
                onChange={handleInputChange}
                className="form-control mb-2"
              />
                <input
                type="number"
                name="points"
                value={newTask.points}
                placeholder="points"
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <button onClick={addTask} className="btn btn-success">
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Activities;

