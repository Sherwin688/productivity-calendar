import React, { useEffect, useRef, useState } from 'react';
import Task from "./Task";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Confetti from "react-confetti";
import {FcApproval} from "react-icons/fc";

function SideBar({date,handleDelete,handleEdit, setDateModalIsOpen, datetasks, handleCheckboxChange, progress }) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
    setWidth(ref.current.clientWidth);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setDateModalIsOpen(false)
      setShowConfetti(true);

      const timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);

      return () => {
        clearTimeout(timeout);
      };
    }// eslint-disable-next-line
  }, [progress]);

  return (
    <div ref={ref} style={{height:"100%"}}>
      {showConfetti && (
        <Confetti
          confettiSource={{ x:10, y: 200 }}
          width={width}
          height={height}
        />
      )}

        {progress===100?<div className="tasks-completed">
          All Tasks Completed
          <FcApproval style={{height:100,width:200}} />
        </div>:
        <>
      <div className="daily-tasks" >
        <h3>Progress</h3>
        <div className="progressBar mb-3">
          <ProgressBar now={progress} label={Math.round(progress) + "%"} />
        </div>
        <h3>Daily Tasks</h3>
        {datetasks.length > 0 ? datetasks.map((task) => task.taskType === "daily" ?
          <Task 
          date={date}
          handleDelete={handleDelete}
           handleEdit={handleEdit}
          taskType="todays" handleCheckboxChange={handleCheckboxChange} key={task.id} id={task.id} task={task.task} status={task.status} />
          : "") : "No Tasks for the day"}
      </div>
      <div className="additional-tasks">
        <h3>Additional Tasks</h3>
        {datetasks.length > 0 ? datetasks.map((task) => task.taskType === "additional" ?
          <Task 
          date={date}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          taskType="todays" handleCheckboxChange={handleCheckboxChange} key={task.id} id={task.id} task={task.task} status={task.status} />
          : "") : "No Tasks for the day"}
      </div>
      </>
}
    </div>
  );
}

export default SideBar;
