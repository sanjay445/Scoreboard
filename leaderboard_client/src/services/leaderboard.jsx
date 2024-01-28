import axios from 'axios';

const API_URL = 'http://localhost:3001/employeeactivities';

const LeaderboardService = {
  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTask: async (params) => {
    const response = await axios.get(API_URL,{params});
    return response.data;
  },

  createTask: async (params) => {
    const response = await axios.post(API_URL, { activitylist:params});
    return response.data;
  },

//   updateTask: async (taskId, taskData) => {
//     const response = await axios.put(`${API_URL}/${taskId}`, { activitylist: taskData });
//     return response.data;
//   },

//   deleteTask: async (taskId) => {
//     await axios.delete(`${API_URL}/${taskId}`);
//   },
};

export default LeaderboardService;
