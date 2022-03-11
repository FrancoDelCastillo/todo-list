import {useState} from "react"

import {ReactComponent as SendIcon} from "../../assets/send-icon.svg"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./AddTask.scss"

import { firebaseConfig } from "../../utils/firebase"
import { initializeApp } from "firebase/app"
import {getFirestore, collection, addDoc} from "firebase/firestore"

// initialize db
initializeApp(firebaseConfig)
const db = getFirestore()

export default function NewTask(props){

    const {setReloadList} = props

    const [ task, setTask] = useState("");

    const addTask = (e)=>{
        e.preventDefault();
        if(task !== ''){
            const colRef = collection(db, 'tasks')

            addDoc(colRef, {
                name: task,
                completed: false
            }).then(()=>{
                setTask('')
                console.log('task added to DB')
            })

            setReloadList(true)

        }
    }

    return(
        <Form className="new-task__form" onSubmit={addTask}>
            <input onChange={(e)=>{setTask(e.target.value)}} type="text" placeholder="Enter new task..." value={task} />
            <Button type="submit" variant="link">
                <SendIcon className="send-icon"/>
            </Button>
        </Form>
    )
}