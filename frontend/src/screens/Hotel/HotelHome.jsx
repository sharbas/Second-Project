import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';

function HotelOwnerDashboard() {
  // Sample data for Pie Chart
  const pieChartData = [
    { name: 'Booked', value: 35 },
    { name: 'Available', value: 65 },
  ];

  // Sample data for Line Chart
  const lineChartData = [
    { name: 'Jan', guests: 30 },
    { name: 'Feb', guests: 45 },
    { name: 'Mar', guests: 20 },
    { name: 'Apr', guests: 60 },
    { name: 'May', guests: 80 },
    { name: 'Jun', guests: 55 },
  ];

  // Sample data for Bar Chart
  const barChartData = [
    { name: '1 BHK', rooms: 10 },
    { name: '2 BHK', rooms: 15 },
    { name: '3 BHK', rooms: 8 },
    { name: 'Other', rooms: 5 },
  ];

  return (
    <div className="bg-sky-900 p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-light text-white mb-4">Hotel Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl  font-light text-black mb-4">Room Availability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl  font-light text-black mb-4">Monthly Guests</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="guests" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 mt-6 rounded-lg shadow-lg">
        <h2 className="text-2xl  font-light text-black mb-4">Room Types</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="rooms" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HotelOwnerDashboard;
