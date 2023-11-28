import React,{useEffect,useState} from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import hotelAxiosInstance from '../../utils/hotelAxiosInstance.js'

function HotelOwnerDashboard() {
  // Sample data for Pie Chart

  const [forPieChart,setForPieChart]=useState(null)
  const [forLineChart,setForLineChart]=useState(null)
  const [forBarChart,setForBarChart]=useState(null)

  
  useEffect(()=>{
 const fetchDataForDashBoard=async()=>{
  try{
const res=await hotelAxiosInstance.get('/dashboardData')
setForPieChart(res.data.hotelStats)
setForLineChart(res.data.bookingTrends)
setForBarChart(res.data.roomTypesWithCount)
console.log('this is res.data',res.data);


setForPieChart(res.data)


  }catch(error){

  }
 }
 fetchDataForDashBoard()

},[])
console.log('this is forLineChart ',forLineChart);
console.log('this is forBarChart outside ',forBarChart);

useEffect(()=>{
  console.log('this is forBarChart useEffect ',forBarChart);

},[forBarChart])

  // Map the data to the required format for PieChart
// Use a specific metric for the pie chart, e.g., numberOfBookings
const pieChartData = forPieChart
  ? [
     
      { name: 'TotalRevenue', value: forPieChart.hotelStats.totalRevenue},
      { name: 'averageBookingAmount', value: forPieChart.hotelStats.averageBookingAmount},
    
      // { name: 'Remaining', value: forPieChart.totalMembers - forPieChart.numberOfBookings },
    ]
  : [];

  // Sample data for Line Chart
  const lineChartData = [
    { name: 'Jan', guests: 30 },
    { name: 'Feb', guests: 45 },
    { name: 'Mar', guests: 20 },
    { name: 'Apr', guests: 60 },
    { name: 'May', guests: 80 },
    { name: 'Jun', guests: 55 },
  ];console.log(forBarChart,'this i s forbarchart state');
// Assuming these are all possible room types
const allRoomTypes = ['1bhk', '2bhk', '3bhk'];

// Sample data for Bar Chart
const barChartData = allRoomTypes.map(roomType => {
  const entry = forBarChart ? forBarChart.find(entry => entry.roomType === roomType) : null;
  return {
    name: roomType,
    rooms: entry ? entry.count : 0,
  };
})

// const barChartData=[]

  return (
    <div className="bg-hotelDashboardbg p-8 max-w-5xl mx-auto">
<h1 className="text-5xl font-normal text-gray-800 mb-6 leading-tight bg-black p-4 text-white shadow-md rounded flex items-center justify-center">
  HOTEL OWNER DASHBOARD
</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black p-1 rounded-lg shadow-lg">
          <h2 className="text-2xl  font-light text-white mb-4">REVENUE AND AVRG AMOUNT </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-black p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl  font-light text-white mb-4">MONTHLY GUESTS</h2>
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
      <div className="bg-black p-4 mt-6 rounded-lg shadow-lg">
        <h2 className="text-2xl  font-light text-white mb-4">ROOM TYPES</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis  domain={[0, 5]} tickCount={5} />
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
