import axios from 'axios';

const API_URL = 'http://localhost:3001/employment_detail';

const EmploymentService = {
getTask: async (params) => {
    const response = await axios.get(API_URL,{params});
    return response.data;
  }
};

export default EmploymentService;
