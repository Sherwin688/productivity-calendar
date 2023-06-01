import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale, PointElement,LineElement,Title} from 'chart.js';
import {TbStack3} from "react-icons/tb"
import { Line } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2';
import {BiError} from "react-icons/bi"
import {GoChecklist} from "react-icons/go"
import { useState } from "react";
import axios from "axios";
function Dashboard() {

  const [lineChartDataValues,setLineChartDataValues] = useState([100, 300, 500, 600, 700, 800, 200,300,400,100,500,300,100])
  const [pieChartDataValues,setPieChartDataValues] = useState([2,4])
  const [totalTasks,setTotalTasks] = useState(0)
  const [incompleteTasks,setIncompleteTasks] = useState(0)

  useState(()=>{
    const todaysDate = new Date()

    axios.post(`http://localhost:8000/getLineChart`,{date:todaysDate}).then((res)=>{
      console.log(res.data.dataset)
      setLineChartDataValues(res.data.dataset)
      setTotalTasks(res.data.totalCompletedTasks)
      setIncompleteTasks(res.data.incompleteTasks)
      setPieChartDataValues(res.data.pieChart)
    })
  },[])
  ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,Title);
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart',
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
  return (
    <div className="dashboard" style={{color:"white"}}>

<div className="row">
<div className="data-group">
  <div className="data-subgroup">
    <div className="data-left">
    <h3>Total Tasks Completed</h3>
            <div className="data-value">
              {totalTasks}
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
            {incompleteTasks}
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
            {totalTasks+incompleteTasks}
            </div>
    </div>
          
    <div className="data-right"  style={{backgroundColor:"#6929c4"}}>
        <GoChecklist />
      </div>
    </div>
  </div>




</div>
      <div className="left">
      <div className="chart-container" >
<h1>Todays Performance</h1>

<Pie data={data} />

</div>

<div className="chart-container-line" >
<h1>Monthly Performance</h1>
<Line options={lineChartOptions} data={lineChartData} />

</div>

      </div>
    </div>
  )
}

export default Dashboard