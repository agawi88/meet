import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const EventGenresChart = ( {events} ) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#eca2a2c6', '#ace8acff', '#8686faff', '#e9e9b3ff', '#f091f0ff']; 

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length
      };
    });
    return data;
  };

    useEffect(() => {
    setData(getData());
    }, [`${events}`]);
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
    
  return (
    <div style={{ width: 480, height: 400 }}>
        <ResponsiveContainer>
        <PieChart
            margin={{ top: 20, right: -20, bottom: 20, left: -10 }}
        >
          <Pie
            dataKey="value"
            nameKey="name"
            data={data}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}>  
          {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
          }     
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" margin="20px 0px"/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
};

EventGenresChart.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventGenresChart;