import {ReactComponent as CheckIcon} from "../../assets/check-line.svg"
import {ReactComponent as CloseIcon} from "../../assets/close-line.svg"

import "./Task.scss"

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../utils/firebase";
import {getFirestore, updateDoc,doc, deleteDoc} from "firebase/firestore"

//initialize db
initializeApp(firebaseConfig)
const db = getFirestore()

export default function Task(props){
    const { task, setReloadList } = props;

    const checkTask = ()=>{
        const docRef = doc(db, 'tasks', task.id);
        updateDoc(docRef, {completed: !task.completed})
        .then(()=>{
            setReloadList(true)
        })
    }

    const deleteTask = ()=>{
        const docRef = doc(db, 'tasks', task.id);
        deleteDoc(docRef).then(
            setReloadList(true)
        )
    }

    return(
        <div className="task-container">
            <div>
                <CheckIcon onClick={checkTask} className={task.completed ?'completed':''} />
            </div>
            
            <div>{task.name}</div>
            <div><CloseIcon onClick={deleteTask}/></div>
        </div>
    )
}