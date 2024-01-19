import React from "react";
import "./dstyle.css";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function Courses() {
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const[cid , setCid] = useState(-1);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const[menu , setMenu] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/languages`)
      .then((response) => response.json())
      .then((data) => {
        setLanguages(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(languages);

  function editCourse(_id) {
    navigate(`/editCourse/${_id}`);
  }
  function addquestions(_id){
    navigate(`/addquestions/${_id}`)
  }
  return (
    <>
      <div>
        <SideBar current={"languages"}  menu = {menu}/>
        <section id="content" style={!menu ? { width: "100%" ,left:1} : {}}>
        <Navbar menu = {menu} setMenu = {setMenu}/>
          <main className="t">
            <div className="table-data">
              <div className="order">
                <div id="course" className="todo">
                  <div className="head" >
                    <h3>Courses</h3>
                    <button
                      onClick={() => navigate("/addlanguage")}
                      style={{
                        backgroundColor: "darkblue",
                        borderRadius: "10px",
                        color: "white",
                        border: "none",
                        padding: "8px",
                        fontWeight: "500",
                      }}
                    >
                      Add Language{" "}
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
                    </button>
                  </div>
                  <ul className="todo-list">
                    {languages.map((language) => (
                      <div key={language._id}>
                        <li className="completed" style={{ marginTop: "10px",backgroundColor:'white',color:'black' }}>
                          <p >{language.name}</p>
                          <div style={{ width: "50px", display: "flex" }}>
                              <button
                                style={{ marginLeft: "-100px",marginRight:'30px'}}
                                className="delete-button"
                              >
                              <FontAwesomeIcon icon={faTrash} className="trash-icon"></FontAwesomeIcon>
                            </button>

                            <button
                              onClick={() => editCourse(language.id)}
                              style={{ marginRight: "40px" ,backgroundColor:'white'}}
                              className="edit-button"
                            >
                              <FontAwesomeIcon   icon={faEdit} className="edit-icon"></FontAwesomeIcon>
                            </button>
                              
                            <button onClick={() => addquestions(language._id)}
                            style={{
                              backgroundColor: "#457BC1",
                              borderRadius: "10px",
                              color: "white",
                              border: "none",
                              padding: "8px",
                              fontWeight: "500",
                            }}
                            >
                              Exercise
                            </button>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
}

export default Courses;
