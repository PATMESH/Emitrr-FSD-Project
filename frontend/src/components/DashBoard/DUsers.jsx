import React, { useEffect  , useState} from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';
function Users() {
  const [users , setUsers] = useState([]);
  const[menu , setMenu] = useState(true);

  useEffect(()=>{
    fetch("http://localhost:8000/users").then((data)=>data.json()).then((res)=>setUsers(res));
  },[])
  return (
    <div style={{backgroundColor:"#eee"}} >
      <SideBar current={"user"}  menu = {menu}/>
      <section id="content" style={!menu ? { width: "100%" ,left:1} : {}}>
       <Navbar menu = {menu} setMenu = {setMenu}/>
        <main>
          <div className="table-data" style={{marginTop:"-10px"}}>
            <div className="order">
              <div className="head">
                <h3>Users Info</h3>
              </div>
              <table id="user" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <th style={{ padding: '10px', textAlign: 'start', borderBottom: '1px solid #ddd' }}>Username</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Phone Number</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Profession</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px', textAlign: 'start', borderBottom: '1px solid #ddd' }}>{user.username}</td>
                    <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.phno}</td>
                    <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.profession}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Users;
