import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale, PointElement,LineElement,Title} from 'chart.js';
import {TbStack3} from "react-icons/tb"
import { Line } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2';
import {BiError} from "react-icons/bi"
import {GoChecklist} from "react-icons/go"
import { useState } from "react";
import axios from "axios";
import { ProgressBar } from 'react-bootstrap';
import {BASE_URL} from "../services/helper"
import moment from "moment";

function Dashboard() {

  const [lineChartDataValues,setLineChartDataValues] = useState([100, 300, 500, 600, 700, 800, 200,300,400,100,500,300,100])
  const [pieChartDataValues,setPieChartDataValues] = useState([2,4])
  const [totalTasks,setTotalTasks] = useState(0)
  const [incompleteTasks,setIncompleteTasks] = useState(0)
  const [percentage,setPercentage] = useState(0)
  const [month,setMonth] = useState("")
  const [spinner, setSpinner] = useState(false);    


  useState(()=>{
    setSpinner(true)
    const now = moment(new Date());
    const findalDate = now.startOf('day').toISOString();
    axios.post(`${BASE_URL}/getLineChart`,{date:findalDate}).then((res)=>{
      setLineChartDataValues(res.data.dataset)
      setTotalTasks(res.data.totalCompletedTasks)
      setIncompleteTasks(res.data.incompleteTasks)
      setPieChartDataValues(res.data.pieChart)
      setPercentage(res.data.monthlyResult.percentage)
      setMonth(res.data.monthlyResult.month)
    setSpinner(false)

    })
  },[])
  ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,Title);
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: true,
      title: {
        display: true,
  
      },
    },
  };
  const lineChartLabels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const lineChartData = {
    labels:lineChartLabels,
    datasets: [
      {
        label: 'Tasks Completed by Month',
        data:lineChartDataValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  const data = {
    labels: ['Tasks Completed', 'Tasks Not Completed'],
    datasets: [
      {
        label: 'no. of tasks',
        data: pieChartDataValues,
        backgroundColor: [
          '#0072c3',
          'rgba(255, 99, 132, 1)',
        ],
        borderColor:[
          '#0072c3',
          'rgba(255, 99, 132,1)',
        ],
       
        borderWidth: 1,
      },
    ],
  };

  const getPercentageLabel = ()=>{
    if(percentage>=70){
      return ("Great Performance!")
    }
    else if(percentage>=40 && percentage<70){
      return ("Good Performance")
    }
    else if(percentage<40){
      return ("Poor Performance")
    }
  }
  const getLabelColor= ()=>{
    if(percentage>=70){
      return ("success")
    }
    else if(percentage>=40 && percentage<70){
      return ("warning")
    }
    else if(percentage<40){
      return ("danger")
    }
  }

  return (
    <>
      <div className="dashboard" style={{color:"white"}}>
<div className="row">
<div className="data-group">
  <div className="data-subgroup">
    <div className="data-left">
    <h3>Total Tasks Completed</h3>
            <div className="data-value">
              {spinner?<div className="spinner"/>:totalTasks}
            </div>
    </div>
          
    <div className="data-right" style={{backgroundColor:"#08bdba"}}>
        <TbStack3/>
      </div>
    </div>
  </div>


  <div className="data-group">
  <div className="data-subgroup">
    <div className="data-left">
    <h3>Total Tasks Not Completed</h3>
            <div className="data-value">
            {spinner?<div className="spinner"/>:incompleteTasks}
            </div>
    </div>
          
    <div className="data-right"  style={{backgroundColor:"#a2191f"}}>
        <BiError />
      </div>
    </div>
  </div>

  <div className="data-group">
  <div className="data-subgroup">
    <div className="data-left">
    <h3>Total Tasks</h3>
            <div className="data-value">
            {spinner?<div className="spinner"/>:totalTasks+incompleteTasks}

            </div>
    </div>
          
    <div className="data-right"  style={{backgroundColor:"#6929c4"}}>
        <GoChecklist />
      </div>
    </div>
  </div>

  <div className="data-group">
    <div className="data-left">
    <h3>{month} Progress</h3>
    {spinner?<div className="spinner"/>:(<>
<ProgressBar style={{height:30}} className="mt-2" now={percentage} variant={getLabelColor()} label={percentage+"%"} />
<div className="data-value mt-2" style={{fontSize:"16px"}}>
{getPercentageLabel()}
</div></>)}
    
    </div>
          
    {/* <div className="data-right"  style={{backgroundColor:"#6929c4"}}>
        <GoChecklist />
      </div> */}
  </div>




</div>
      <div className="left">
      <div className="chart-container" >
<h1>Todays Performance</h1>
<Pie data={data} />
<h5 className="text-center">{pieChartDataValues[0]}/{pieChartDataValues[1]+pieChartDataValues[0]} tasks completed</h5>

</div>

<div className="chart-container-line" >
<h1>Monthly Performance</h1>
<Line options={lineChartOptions} data={lineChartData} />

</div>

      </div>
    </div>
    
   </>
  )
}

export default Dashboard