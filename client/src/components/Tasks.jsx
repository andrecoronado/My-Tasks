import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import api from '../api'

function Tasks(props)  {

    const [notes, setNotes] = useState(props.login.notes);


    async function addNote(newNote) {
      const createTask = await api.createTask(newNote)
        .catch(function (error) { if( error.response.status === 401 ){ props.setLogOff() } })
      if ( createTask ) { 
        newNote._id = createTask.data._id
        setNotes(prevNotes => {
          return [...prevNotes, newNote];
        })
      }     
    }
  
    async function deleteNote( _id ) {
      const deleteTask = await api.deleteTask( _id )
        .catch(function (error) { if( error.response.status === 401 ){ props.setLogOff() } })
      if ( deleteTask ){
        setNotes(prevNotes => { return prevNotes.filter(notes => notes._id !== _id) });
      }
      
    }
    return (
      <section className = "task">
        <Header 
          setLogOff={props.setLogOff}
        />
        <CreateArea onAdd={addNote} />
        <div className = "note-space"> 
          {notes.map((noteItem, index) => {
            return (
                <Note
                key={index}
                id={index}
                _id={noteItem._id}
                completed={noteItem.completed}
                title={noteItem.title}
                description={noteItem.description}
                onDelete={deleteNote}
                setLogOff={props.setLogOff}
                />
            );
            })}
        </div>
      </section>
    )
}
export default Tasks;