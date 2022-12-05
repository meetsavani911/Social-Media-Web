import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData'

const TrendCard = () => {
  return (
    <div className="TrendCard">
        <h3>Trends for you</h3>
        {TrendData.map((Trend)=>{
            return(
                <div className="trend">
                    <span>#{Trend.name}</span>
                    <span>{Trend.shares}K shares</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard