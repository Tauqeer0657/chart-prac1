import React, { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import Box from "@mui/material/Box";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  console.log(chartData, "chart");

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:3306/api/data")
      .then((response) => response.json())
      .then((data) => {
        // Process the data if needed
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  if (!chartData) {
    return (
      <Box sx={{display:'flex'}}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1 ,marginTop:"65px"}}>
        <p>Loading...</p>
      </Box>
      </Box>
    )
  }

  // Extract only the first 10 data points
  const first10Data = chartData.slice(0, 10);

  // Extract data for each chart from the first 10 data points
  const dataPoints1 = first10Data.map((point) => ({
    x: new Date(point.TIME_LOG),
    y: parseFloat(point.PRED_SI_PER),
  }));

  const dataPoints2 = first10Data.map((point) => ({
    x: new Date(point.TIME_LOG),
    y: parseFloat(point.O2_ENRICHMENT),
  }));

  const dataPoints3 = first10Data.map((point) => ({
    x: new Date(point.TIME_LOG),
    y: parseFloat(point.PCI),
  }));

  const dataPoints4 = first10Data.map((point) => ({
    x: new Date(point.TIME_LOG),
    y: parseFloat(point.RAFT),
  }));

  // Options for Chart 1
  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Predicted silicon",
    },
    axisX: {
      title: "Time(hh:mm)",
      valueFormatString: "HH:mm", // Display time in "hh:mm" format
    },
    axisY: {
      title: "Percentage %",
    },
    data: [
      {
        type: "line",
        dataPoints: dataPoints1,
      },
    ],
  };

  // Options for Chart 2
  const options2 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "PCI",
    },
    axisX: {
      title: "Time(hh:mm)",
      valueFormatString: "HH:mm", // Display time in "hh:mm" format
    },
    axisY: {
      title: "KGTHM",
    },
    data: [
      {
        type: "spline",
        dataPoints: dataPoints2,
      },
    ],
  };

  // Options for Chart 3
  const options3 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "02 ENRICHMENT",
    },
    axisX: {
      title: "Time(hh:mm)",
      valueFormatString: "HH:mm", // Display time in "hh:mm" format
    },
    axisY: {
      title: "Percentage %",
    },
    data: [
      {
        type: "stepLine",
        dataPoints: dataPoints3,
      },
    ],
  };

  // Options for Chart 4
  const options4 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "RAFT",
    },
    axisX: {
      title: "Time(hh:mm)",
      valueFormatString: "HH:mm", // Display time in "hh:mm" format
    },
    axisY: {
      title: "Percentage %",
    },
    data: [
      {
        type: "area",
        dataPoints: dataPoints4,
      },
    ],
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "65px",
          padding: "10px",
    
        }}
      >
        <div style={{ display: "flex"}}>
          <div style={{ flex: 1, margin: "10px", border:"1px solid #dddddd" }}>
            <CanvasJSChart options={options1}/>
          </div>
          <div style={{ flex: 1 , margin: "10px", border:"1px solid #dddddd"}}>
            <CanvasJSChart options={options2} />
          </div>
        </div>
        <div  style={{ display: "flex"}}>
          <div style={{ flex: 1, margin: "10px" , border:"1px solid #dddddd"}}>
            <CanvasJSChart options={options3} />
          </div>
          <div style={{ flex: 1 , margin: "10px", border:"1px solid #dddddd"}}>
            <CanvasJSChart options={options4} />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
