import React, { useState, useEffect } from 'react'
import './styles.css'

import { Card } from '../../components/Card'
import Moment from 'moment';

export function Home() {
  const textInput = React.useRef();
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudents() {
    const newStudent = {
      name: studentName, 
      date: Moment().format('MMM Do YY'),
      time: Moment().format('HH:mm:ss A')
    }

    setStudents(prevState => [...prevState, newStudent])
    clearInput();
  }

  const clearInput = () => (textInput.current.value = "");

  useEffect(() => {
    fetch('https://api.github.com/users/maisamaximo')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [students])

  return (
    <div className='container'>
      <header>
        <h1>Attendance list</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Maisa's profile picture" />
        </div>
      </header>
      <input type="text" ref={textInput} placeholder='Type your name' onChange={e => setStudentName(e.target.value)}/>
      <button type='button' onClick={handleAddStudents}>Add</button>

    {
      students.map(student => (
        <Card key={student.time} name={student.name} time={student.time} date={student.date}/>
      ))
    }
    </div>
  )
}