import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./DonutChart.css";

const DonutChart = (props) => {
    let sysCharge=(props.charge);
    let emptyCharge=100-sysCharge;
    let donutColor=props.backgroundColor;

    return (
        <div className= 'chart'>
            <Doughnut
            data={
                {                   
                    datasets: [
                        {
                            data:[sysCharge,emptyCharge],
                            backgroundColor: donutColor,
                            borderColor: 'rgb(10, 58, 58)',                           
                        }
                    ],
                }
            }
            height={350}
            width={350}
            options={
                {
                    maintainAspectRatio: true,     
                        
                }
            }
            />
            
        </div>
    );
};
export default DonutChart;