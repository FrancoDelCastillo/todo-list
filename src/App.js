import {useState, useEffect} from "react"

import AddTask from "./components/AddTask"
import Task from "./components/Task"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"

import "./App.scss"

import { firebaseConfig } from "./utils/firebase"
import { initializeApp } from "firebase/app"
import {getFirestore, collection, getDocs, query, orderBy} from "firebase/firestore"

// initialize db
initializeApp(firebaseConfig);
const db = getFirestore();

function App() {

  const [ tasks, setTasks] = useState(null);

  const [ reloadList, setReloadList] = useState(true)

  useEffect(()=>{
    const colRef = collection(db, 'tasks')
    const q = query(colRef, orderBy('completed'))
    getDocs(q).then((response)=>{
      let list = []
      response.docs.forEach((doc)=>{
        list.push({...doc.data(), id: doc.id})
      })
      setTasks(list)
      setReloadList(false)
    }).catch(err => {
      console.log(err.message)
    });

  },[reloadList])

  return (
    <Container fluid className="app">
      
      <Row className="main-title">
        <h2>To-do List in Firebase Storage</h2>
      </Row>

      <Row className="main-container">
        
        <Col className="main-container__title g-0" 
        xs={{span:10, offset:1}}
        md={{span:6, offset:3}}>
        <h2>Today</h2>
        </Col>

        <Col className="main-container__list g-0"
        xs={{span:10, offset:1}}
        md={{span:6, offset:3}}>

          {!tasks ? <div className="loading">
                      <Spinner animation="border" role="status"/>
                      <span>loading...</span>
                    </div>: (tasks.length < 1? <div className="loading"><h4>No tasks!</h4></div>:
                    tasks.map((task,index)=>{ return <Task key={index} task={task} setReloadList={setReloadList} />}))
                      
          }
        </Col>

        <Col xs={{span:10, offset:1}}
        md={{span:6, offset:3}} className="g-0">
        <AddTask setReloadList={setReloadList}/>
        </Col>

      </Row>
    </Container>
  );
}

export default App;
