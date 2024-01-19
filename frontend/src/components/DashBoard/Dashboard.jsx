import React, {useState,useEffect} from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';
function Dashboard() {
  
  const [userscount , setUserscount] = useState(0);
  const [coursescount , setCoursescount] = useState(0);
  const[menu , setMenu] = useState(true);

  useEffect(()=>{
     fetch("https://language-learning-game-z20w.onrender.com/users").then((data)=>data.json()).then((res)=>setUserscount(res.length));
    fetch("https://language-learning-game-z20w.onrender.com/languages").then((data)=>data.json()).then((res)=>setCoursescount(res.length));
  },[])

  return (
    <div style={{backgroundColor:"#eee"}}>
      <SideBar current={"dashboard"} menu = {menu}/>
      <section id="content" style={!menu ? { width: "100%" ,left:1} : {}}>
        <Navbar menu = {menu} setMenu = {setMenu}/>
        <main>
          <div className="head-title">
            <div className="left">
              <h1 id="dashboard" style={{color:'darkblue'}} > Dashboard</h1>
            </div>
          </div>
          <ul  className="box-info">
            <li style={!menu ? { width: "100%" ,left:1} : {}}>
            <i className='bx bxs-group' id="i"></i>
              <span className="text">
                <h3>{userscount}</h3>
                <p>Total Users</p>
              </span>
            </li>
            <li style={!menu ? { width: "100%" ,left:1} : {}}>
            <i className='bx bx-book' id="i"></i>
              <span className="text">
                <h3>{coursescount}</h3>
                <p>Total Courses</p>
              </span>
            </li>
            {/* <li style={!menu ? { width: "100%" ,left:1} : {}}>
              <i className='bx bxs-calendar-check' id="i"></i>
              <span className="text">
                <h3>{enrolled}</h3>
                <p>Total Enrollment</p>
              </span>
            </li> */}
          </ul>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
