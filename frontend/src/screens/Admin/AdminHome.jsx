import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  // Sample data for pie chart and bar graph
  const pieChartData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 200 },
  ];

  const barGraphData = [
    { name: 'Data 1', value: 100 },
    { name: 'Data 2', value: 200 },
    { name: 'Data 3', value: 300 },
    { name: 'Data 4', value: 400 },
    { name: 'Data 5', value: 500 },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Container >
      <div className=' pl-24'>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" component="h2" gutterBottom>
              Pie Chart
            </Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" component="h2" gutterBottom>
              Bar Graph
            </Typography>
            <BarChart width={400} height={400} data={barGraphData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Typography variant="h6" component="h2" gutterBottom>
              Statistics 1
            </Typography>
            {/* Add your statistics content here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Typography variant="h6" component="h2" gutterBottom>
              Statistics 2
            </Typography>
            {/* Add your statistics content here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Typography variant="h6" component="h2" gutterBottom>
              Statistics 3
            </Typography>
            {/* Add your statistics content here */}
          </Paper>
        </Grid>
      </Grid>
      </div>
    </Container>
  );
};

export default Dashboard;
