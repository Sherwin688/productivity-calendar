import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css';
import DateModal from "./DateModal";
import axios from "axios";
import SideBar from "./SideBar";
// const BASE_URL = process.env.REACT_APP_BASE_URL
import { BASE_URL } from "../services/helper"
import moment from "moment/moment";

function Home() {
  const [date, setDate] = useState(new Date());
  // const todaysDate = new Date()
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [todaysTasks, setTodaysTasks] = useState([])
  const [progress, setProgress] = useState()
  const [spinner, setSpinner] = useState(false);




  useEffect(() => {
    setSpinner(true)
    getProgressBarPercentage(todaysTasks)
    setSpinner(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todaysTasks])
  useEffect(() => {
    setSpinner(true)
    const now = moment(new Date());
    const findalDate = now.startOf('day').toISOString();
    axios.post(`${BASE_URL}/find`,
      {
        "date": findalDate
      }
    ).then((response) => {
      if (response.data.message === "success") {
        setTasks(response.data.data.tasks)
        setTodaysTasks(response.data.data.tasks)
        getProgressBarPercentage(response.data.data.tasks)
      }


      else
        setTasks([])
      setSpinner(false)
      setDateModalIsOpen(true)

    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleEdit = (date, id, value, taskType = "normal") => {
    setSpinner(true)
    const now = moment(date);
    const findalDate = now.startOf('day').toISOString();
    const todaynow = moment(date);
    const todaysDate = todaynow.startOf('day').toISOString();
    console.log(findalDate===todaysDate)
    if (taskType === "todays") {
      axios.put(`${BASE_URL}/update`, {
        "date": findalDate,
        "tasks": todaysTasks.map((task) => {
          if (task.id === id) {
            task.task = value
          }
          return task
        })
      }).then((response) => {
        if (response.data.message === "success") {
          setTodaysTasks(response.data.data.tasks)

        }
        else
          setTasks([])
        setSpinner(false)

      })
    }
    else {
      axios.put(`${BASE_URL}/update`, {
        "date": findalDate,
        "tasks": tasks.map((task) => {
          if (task.id === id) {
            task.task = value
          }
          return task
        })
      }).then((response) => {
        if (response.data.message === "success") {

          if (findalDate===todaysDate) {
            setTodaysTasks(response.data.data.tasks)
          }
          setTasks(response.data.data.tasks)

        }
        else
          setTasks([])
        setDateModalIsOpen(true)
        setSpinner(false)

      })
    }
  }
  const deleteTask = (date, id, taskType = "normal") => {
    setSpinner(true)
    const now = moment(date);
    const findalDate = now.startOf('day').toISOString();
    const todaynow = moment(new Date());
    const todaysDate = todaynow.startOf('day').toISOString();
    if (taskType === "todays") {
      axios.put(`${BASE_URL}/update`, {
        "date": findalDate,
        "tasks": todaysTasks.filter((task) => id !== task.id)
      }).then((response) => {
        if (response.data.message === "success") {
          setTodaysTasks(response.data.data.tasks)

        }
        else
          setTasks([])

        setSpinner(false)

        // setDateModalIsOpen(true)
      })
    }
    else {

      axios.put(`${BASE_URL}/update`, {
        "date": findalDate,
        "tasks": tasks.filter((task) => id !== task.id)
      }).then((response) => {
        if (response.data.message === "success") {
          if (findalDate===todaysDate) {

            setTodaysTasks(response.data.data.tasks)
          }
          setTasks(response.data.data.tasks)

        }
        else
          setTasks([])
        setDateModalIsOpen(true)
        setSpinner(false)

      })
    }
  }

  const getProgressBarPercentage = (t = tasks) => {
    setSpinner(true)

    let count = 0;
    t.forEach(task => {
      if (task.status === "complete")
        count++;
    });
    let progressBarPercentage = parseFloat((count / (t.length)) * 100)
    setProgress(progressBarPercentage)
  }
  const addAdditionalTask = (date, value) => {
    const now = moment(date);
    const findalDate = now.startOf('day').toISOString();
    const todaynow = moment(new Date());
    const todaysDate = todaynow.startOf('day').toISOString();

    const currentTaskId = (tasks.length < 1) ? 1 : parseInt(tasks[tasks.length - 1].id) + 1

    axios.put(`${BASE_URL}/update`, {
      "date": findalDate,
      "tasks": [...tasks, { "id": currentTaskId, "task": value, status: "incomplete", "taskType": "additional" }]
    }).then((response) => {
      setTasks(response.data.data.tasks)

      if (findalDate===todaysDate) {
        setTodaysTasks(response.data.data.tasks)
      }
      setSpinner(false)

    })
  }
  const findTask = (dateClicked) => {
    setSpinner(true);
    const now = moment(dateClicked);
    const findalDate = now.startOf('day').toISOString();


    axios.post(`${BASE_URL}/find`, {
      date: dateClicked === "" ? "" : findalDate,
    }).then((response) => {
      if (response.data.message === "success") {
        setTasks(response.data.data.tasks);
        setDateModalIsOpen(true);
      } else {
        setTasks([]);
      }
      setSpinner(false);
      setDateModalIsOpen(true);
    });
  };

  const handleDayClick = (dateClicked) => {
    setDate(dateClicked);
    findTask(dateClicked)

  }

  const updateTask = (date, taskType = "normal") => {
    setSpinner(true)
    const now = moment(date);
    const findalDate = now.startOf('day').toISOString();
    const todaynow = moment(new Date());
    const todaysDate = todaynow.startOf('day').toISOString();
    if (taskType === "todays") {
      axios.put(`${BASE_URL}/update`, {
        "date": findalDate,
        "tasks": todaysTasks
      }).then((response) => {
        setTodaysTasks(response.data.data.tasks)
        if (todaysDate === date) {
          setTasks(response.data.data.tasks)
        }
        setSpinner(false)

      })
    }
    else {
      axios.put(`${BASE_URL}/update`, {
        "date": findalDate,
        "tasks": tasks
      }).then((response) => {
        if (findalDate===todaysDate) {
          setTodaysTasks(response.data.data.tasks)
        }
        setTasks(response.data.data.tasks)
        setSpinner(false)

      })
    }

  }

  const handleAddDailyTaskClick = (date, taskName) => {
    setSpinner(true)
    const now = moment(date);
    const findalDate = now.startOf('day').toISOString();
    const currentTaskId = (todaysTasks.length < 1) ? 1 : parseInt(todaysTasks[todaysTasks.length - 1].id) + 1
    axios.post(`${BASE_URL}/addDailyTask`, {
      "date": findalDate,
      "task": { "id": currentTaskId, "task": taskName, taskType: "daily", status: "incomplete" }
    }).then((response) => {
      setTodaysTasks([...todaysTasks, response.data.data])
      setSpinner(false)

    })
  }


  const handleDelete = (id, taskType = "normal") => {
    const now = moment(new Date());
    const findalDate = now.startOf('day').toISOString();
    setSpinner(true)

    if (taskType === "todays") {
      setTodaysTasks(todaysTasks.filter((task) => task.id !== id))

      deleteTask(findalDate, id, "todays")
      setSpinner(false)

    }

    else {
      const tnow = moment(new Date(date));
      const tfindalDate = tnow.startOf('day').toISOString();
      setTasks(tasks.filter((task) => task.id !== id))
      deleteTask(tfindalDate, id)
      setSpinner(false)

    }

  }
  const handleCheckboxChange = (id, e, taskType) => {

    if (taskType === "todays") {
      setTodaysTasks(todaysTasks.map((task) => {

        if (task.id === id) {
          if (e.target.checked) {
            task.status = "complete"
          }
          else {
            task.status = "incomplete"
          }
        }
        return task
      }))
      const now = moment(new Date());
      const findalDate = now.startOf('day').toISOString();

      updateTask(findalDate, "todays")

    }

    else {
      setTasks(tasks.map((task) => {

        if (task.id === id) {
          if (e.target.checked) {
            task.status = "complete"
          }
          else {
            task.status = "incomplete"
          }
        }
        return task
      }))
      const rnow = moment(new Date(date));
  const rfindalDate = rnow.startOf('day').toISOString();
      updateTask(rfindalDate)

    }




  }

  const handleDailyEdit = (id, value, taskType) => {
    const now = moment(new Date());
  const findalDate = now.startOf('day').toISOString();
  const todaynow = moment(new Date());
  const todaysDate = todaynow.startOf('day').toISOString();
    setSpinner(true)

    todaysTasks.map((task) => {
      if (task.id === id) {
        task.task = value
      }
      return task
    })
    if (taskType === "todays") {
      axios.put(`${BASE_URL}/updateDailyTask`,
        {
          "date": findalDate,
          "tasks": todaysTasks.filter((task) => task.taskType === "daily")
        }
      ).then((response) => {
        setTodaysTasks(todaysTasks.map((task) => {
          if (task.id === id) {
            task.task = value
          }
          return task
        }))
        if (findalDate===todaysDate) {
          setTasks(tasks.map((task) => {
            if (task.id === id) {
              task.task = value
            }
            return task
          }))
        }
        setSpinner(false)

      })
    }
    else {
      axios.put(`${BASE_URL}/updateDailyTask`,
        {
          "tasks": todaysTasks.filter((task) => task.taskType === "daily")
        }
      ).then((response) => {
        setTasks(tasks.map((task) => {
          if (task.id === id) {
            task.task = value
          }
          return task
        }))
        if (findalDate===todaysDate) {
          setTodaysTasks(todaysTasks.map((task) => {
            if (task.id === id) {
              task.task = value
            }
            return task
          }))
        }
        setSpinner(false)

      })
    }


  }
  const handleDailyDelete = (id, taskType) => {
    setSpinner(true)
    const now = moment(new Date());
    const findalDate = now.startOf('day').toISOString();
    const todaynow = moment(new Date());
    const todaysDate = todaynow.startOf('day').toISOString();
    if (taskType === "todays") {
      axios.put(`${BASE_URL}/removeDailyTask`,
        {
          "date": findalDate,
          "tasks": todaysTasks.filter((task) => {
            if (task.id !== id && task.taskType !== "additional") {
              return true
            }
            else
              return false
          })
        }
      ).then((response) => {

        setTodaysTasks(todaysTasks.filter((task) => task.id !== id))
        if (findalDate===todaysDate) {
          setTasks(tasks.filter((task) => task.id !== id))
        }
        setSpinner(false)

      })
    }
    else {
      axios.put(`${BASE_URL}/removeDailyTask`,
        {
          "tasks": tasks.filter((task) => {
            if (task.id !== id && task.taskType !== "additional") {
              return true
            }
            else {
              return false
            }
          })
        }
      ).then((response) => {
        setTasks(tasks.filter((task) => task.id !== id))
        if (findalDate===todaysDate) {
          setTodaysTasks(todaysTasks.filter((task) => task.id !== id))
        }
        setSpinner(false)

      })
    }


  }
  return (


    <>
      {spinner ? <div className="loader-container">
        <div className="spinner"></div>
      </div> :
        <div className="container-fluid d-flex p-0">
          <div className="sidebar">
            <SideBar
            setDate={setDate}
              spinner={spinner}
              findTask={findTask}
              tasks={tasks}
              dateModalIsOpen={dateModalIsOpen}
              addAdditionalTask={addAdditionalTask}
              handleDailyEdit={handleDailyEdit}
              handleDailyDelete={handleDailyDelete}
              handleAddDailyTaskClick={handleAddDailyTaskClick}
              date={date}
              setDateModalIsOpen={setDateModalIsOpen}
              progress={progress}
              handleCheckboxChange={handleCheckboxChange}
              datetasks={todaysTasks}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
          <div className="main-content">
            {
              dateModalIsOpen &&
              <DateModal
                spinner={spinner}
                handleDailyDelete={handleDailyDelete}
                findTask={findTask}
                addAdditionalTask={addAdditionalTask}
                handleCheckboxChange={handleCheckboxChange}
                date={date}
                datetasks={tasks}
                dateModalIsOpen={dateModalIsOpen}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setDateModalIsOpen={setDateModalIsOpen} />

            }
            <Calendar showNeighboringMonth={false} value={date} onClickDay={handleDayClick} /></div>
        </div>}
    </>
  )
}

export default Home