import axios from 'axios';

const API_URL = 'http://localhost:3001/activities';

const ActivityMasterService = {
  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTask: async (taskId) => {
    const response = await axios.get(`${API_URL}/${taskId}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post(API_URL, { activities: taskData });
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await axios.put(`${API_URL}/${taskId}`, { activities: taskData });
    return response.data;
  },

  deleteTask: async (taskId) => {
    await axios.delete(`${API_URL}/${taskId}`);
  },
};

export default ActivityMasterService;
