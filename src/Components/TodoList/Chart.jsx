import { Chart as ChartJS, ArcElement } from "chart.js"
import { Doughnut } from "react-chartjs-2"


ChartJS.register(ArcElement)

export default function Chart({completedTasks, total}) {

 const data = {
  labels : ['Active', 'Completed'],
  datasets : [{
    label : 'Achivements',
    data : [completedTasks, total - completedTasks],
    backgroundColor : ['#7372F1', '#4B4B55'],
    hoverOffset : 4,
    borderWidth : 0,
  }]
}

const options = {
  animation : {
    duration : 600,
    easeing : 'easeInOutSine',
  },
  layout : {
    padding : 5
  }
}


  return (
    <Doughnut height={10} width={10} data={data} options={options}></Doughnut>
  )
}
