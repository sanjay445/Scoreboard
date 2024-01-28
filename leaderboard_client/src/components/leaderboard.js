import React, { useState, useEffect } from 'react';
import {  Link,useNavigate} from 'react-router-dom';
import LeaderboardService from '../services/leaderboard';
import EmploymentService from '../services/employmentService'
import ActivityMasterService from '../services/ActivityMasterService';
import axios from "axios";
import "../styles/leaderboard.css";

const Leaderboard = (props) => {
    const [activities, setActivities] = useState([]);
    const [activityId, isSelectActivity] = useState([]);
    const [emplist, setTasks] = useState([]);
    const [empActivityList, setempActivityList] = useState([]);
    const [selectedAssociateId, setSelectedAssociateId] = useState(null);
    const [associateID, setAssociateId ] = useState(0)
    const [selectedassociateID, setSelectedAssociateID ] = useState(1)
    const [role, setRole] = useState(0)
    // const [empType, setempType] = useState([]);

    const navigate = useNavigate();
    useEffect( () => {
      props.checkLoggedIn().then((res)=>{
        console.log("res:",res)
        if(!res.data.logged_in){
          window.location.replace('http://localhost:3000/');
        }else{
          setAssociateId(res.data.user.id)
          setRole(res.data.user.role_id)
        }
      })
         loadTasks(); 
      }, []);

        const logout=()=>{
        axios
        .delete(
          "http://localhost:3001/logout", { withCredentials: true }
        )
        .then(response => {
          console.log("Logout response:",response)
          window.location.replace('http://localhost:3000/');
        })
        .catch(error => {
          console.log("logout error", error);
        });
      }
     const loadTasks = async () => {
        const data = await ActivityMasterService.getAllTasks();
        setActivities(data);
        console.log("activities:",data)
        const tasksData = await LeaderboardService.getAllTasks();
        setTasks(tasksData);
        console.log("emplist:",emplist)
      };

      const getAssociateId = async (associate_id) =>{
        setSelectedAssociateId(associate_id);
        console.log("associate_id",associate_id)
        const empActivityList = await LeaderboardService.getTask({associate_id});
        setempActivityList(empActivityList)
        console.log("tasksData",empActivityList)
        setSelectedAssociateID(associate_id)
        // const empTypeData = await EmploymentService.getTask({associate_id});
        // setempType(empTypeData)
        // console.log("empTypeData",empTypeData)
        loadTasks()
      }

      const isSelectActivityId=async (id)=>{
        isSelectActivity(id)
        console.log("Add data to:",selectedAssociateId)
        await LeaderboardService.createTask({associate_id:selectedAssociateId,activity_id:id});
        getAssociateId(selectedAssociateId)
      }
      const header = {
                backgroundColor: "#343a40", // Set the background color for the div
                padding: "10px"
              };
              const headerrow = {
                backgroundColor: "#343a40", // Set the background color for the div
                paddingLeft: "10px"
              };
              const tabs = {
                listStyleType: "none",
                display: "flex",
                gap:"2%",
                paddingLeft: 0,
              };
              
              const logoutBtn = {
                cursor: "pointer",
                color: "#fff", // Set the color of the icon to white
              };

              const activitybtn = {
                marginRight: "2px"
              }
       return (
         <div>
        <div style={header}>
         <nav className='row' style={headerrow}>
           <ul className='col-11' style={tabs}>
             <li>{role==1? <Link to="/activities" style={{ color: "#fff" }}>Activity points</Link>:<p></p>}
              
             </li>
             <li>
               <Link to="/leaderboard" style={{ color: "#fff" }}>Leaderboard</Link>
             </li>
           </ul>
           <div className='col-1' style={logoutBtn} onClick={logout}>
           <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
              height="16"
               fill="currentColor"
               className="bi bi-box-arrow-right"
               viewBox="0 0 16 16"
             >
             <path
                fillRule="evenodd"
                 d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
               />
               <path
                 fillRule="evenodd"
                 d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
               />
            </svg>
           </div>
         </nav>
       </div>
      
      <div className='bodyContent row' >
      <div className='col-6'>
      <h3>Leaderboard</h3>
      <table className="associates-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Associate ID</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody >
        {emplist.map((associate, index) => (
          <tr className={selectedAssociateId === associate.associate_id ? 'selected hoverRow' : 'hoverRow'}
           key={index} onClick={()=>getAssociateId(associate.associate_id)}>
             <td>{index+1}</td>
            <td>{associate.associate_id}</td>
            <td>{associate.name}</td>
            <td>{associate.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <div className='col-6'>
    <div className='title'><h3 className='h3style'>Activity Tracker </h3>
    {/* &nbsp; {empType[0]?.id?': '+empType[0]?.employment_type_name:''} */}
    &nbsp;&nbsp;
    {/* <button onClick={()=>addData()} className='success'>Add</button> */}
    </div>
    <div >
    {associateID === selectedassociateID && (
        <div className='activityListbox'>
          {activities.map((res) => (
            <button
              key={res.id}
              className='btn btn-secondary'
              style={activitybtn}
              onClick={() => isSelectActivityId(res.id)}
            >
              {res.name}
            </button>
          ))}
        </div>
      )}
    </div>
    <table className="associates-table">
      <thead>
        <tr>
          <th>Activity Name</th>
          <th>Description</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
      {empActivityList.length==0?<tr>No Data</tr>:
        empActivityList.map((associate, index) => (
          <tr key={index}>
            <td>{associate.name}</td>
            <td>{associate.description}</td>
            <td>{associate.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  );
};

export default Leaderboard;

