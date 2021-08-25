import React, { useEffect, useState } from 'react';
import './Battery.css';
import '../DonutChart/DonutChart'
import DonutChart from '../DonutChart/DonutChart';
import logo from "../images/Finnwind_logo.png";
const Battery = (props) => {
let auth_tokens=props.auth_data.token;
let id=props.auth_data.idUser;
const idSite=props.idSite;
const [sysdata, setSysdata]=useState([])

    useEffect(() => {    

         setInterval(() => {
            fetch(`https://vrmapi.victronenergy.com/v2/users/${id}/installations?extended=1`,{
                    method: 'GET',
                    headers: {
                       'X-Authorization': `Bearer  ${auth_tokens}`
                    }    
               }).then(response => response.json())
                 .then(resdata => {
                     console.log(resdata)
                     setSysdata(resdata)})
                 .catch(error => console.error(error)) 

        }, 55000);

    },[])

    return (
        <div>
            {(() => {
               if (sysdata.length!==0) {

                   // Visualize the system data.
                  // console.log(sysdata);
                  
                  //Main dashboard output 
                   let batteryCharge=sysdata.records[1].extended[3].rawValue;
                   let remainingFuel=Math.round(sysdata.records[1].extended[23].instances[20].rawValue);
                   let powerCunsumption=Math.round(sysdata.records[1].extended[14].rawValue);

                    return (
                    <div className ='system_layout'>

                        <h3> Hybrid System Status</h3>
                        <p> ID: {idSite}</p>
                        

                     <div className="system_status">

                          <div className= 'finnwindText'>
                             <h5>
                                 Current Consumption: {powerCunsumption} W
                             </h5>
                          </div>



                          <div className= "donut_charts">  

                             <div className= "chart_container_1">
                                 <DonutChart charge= {batteryCharge}  backgroundColor={['rgba(13, 172, 80)', 'rgba(173,216,230)']}> </DonutChart>
                                 <h6> Battery Charged: {batteryCharge} %</h6>
                             </div>

                             <div className= "chart_container_2">
                                  <DonutChart charge= {remainingFuel} backgroundColor={['rgba(30,144,255)', 'rgba(173,216,230)']} > </DonutChart>  
                                  <h6> Remaining Fuel: {remainingFuel} %</h6>
                             </div>   

                          </div>



                         <div className= 'finnwindText'>
                             <h6>
                                 Powered by: <img src={logo} alt="Logo"/>
                             </h6>
                         </div>
    
                     </div> 

                    </div>
                           
                    )
                } 

                else{
                    return(
                        <div className= 'data_loading'> System Data Loading ...</div>
                    )
                }   
            })()}

        </div>    
    );
};

export default Battery;