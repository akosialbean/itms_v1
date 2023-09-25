import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Grid, Paper, Typography } from "@mui/material";
import {
  FaDesktop,
  FaLaptop,
  FaMobileAlt,
  FaChartPie,
  FaUser,
} from "react-icons/fa";
import { HiCpuChip } from "react-icons/hi2";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const theme = useTheme();

  const fetchDeviceCounts = async () => {
    try {
      const desktopCountResponse = await axios.get(
        "http://localhost:8000/api/devices/dashboard/desktopCount"
      );
      const laptopCountResponse = await axios.get(
        "http://localhost:8000/api/devices/dashboard/laptopCount"
      );
      const phoneCountResponse = await axios.get(
        "http://localhost:8000/api/devices/dashboard/phoneCount"
      );

      const desktopCount = desktopCountResponse.data;
      const laptopCount = laptopCountResponse.data;
      const phoneCount = phoneCountResponse.data;

      return { desktopCount, laptopCount, phoneCount };
    } catch (error) {
      console.error("Error fetching device counts:", error);
      return { desktopCount: 0, laptopCount: 0, phoneCount: 0 };
    }
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "devices-bar-chart",
        foreColor: theme.palette.mode === "dark" ? "#fff" : "#333", // Set text color based on theme mode
      },
      xaxis: {
        categories: ["Desktops", "Laptops", "Mobile Phones"],
        labels: {
          style: {
            colors: theme.palette.mode === "dark" ? "#fff" : "#000", // Set label color based on theme mode
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.mode === "dark" ? "#fff" : "#000", // Set label color based on theme mode
          },
        },
      },

      tooltip: {
        theme: theme.palette.mode, // Set tooltip theme based on theme mode
      },

      colors: [theme.palette.mode === "dark" ? "#ff4500" : "#ff8c00"], // Set bar color based on theme mode
    },
    series: [
      {
        name: "Devices",
        data: [0, 0, 0], // Initial data, will be updated after fetching
      },
    ],
  });

  useEffect(() => {
    fetchDeviceCounts().then(({ desktopCount, laptopCount, phoneCount }) => {
      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [
          {
            ...prevChartData.series[0],
            data: [desktopCount, laptopCount, phoneCount],
          },
        ],
      }));
    });
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return 0;
    }
  };

  const [desktopCount, setDesktopCount] = useState("");
  const [laptopCount, setLaptopCount] = useState("");
  const [phoneCount, setPhoneCount] = useState("");
  const [deviceCount, setDeviceCount] = useState("");

  useEffect(() => {
    fetchData("http://localhost:8000/api/devices/dashboard/desktopCount").then(
      (count) => {
        setDesktopCount(count);
      }
    );
    fetchData("http://localhost:8000/api/devices/dashboard/laptopCount").then(
      (count) => {
        setLaptopCount(count);
      }
    );
    fetchData("http://localhost:8000/api/devices/dashboard/phoneCount").then(
      (count) => {
        setPhoneCount(count);
      }
    );
    fetchData("http://localhost:8000/api/devices/dashboard/deviceCount").then(
      (count) => {
        setDeviceCount(count);
      }
    );
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      {userInfo ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #40e0d0 0%, #ff8c00 100%)",
                    color: "white",
                    padding: "16px",
                  }}
                >
                  <FaChartPie style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" gutterBottom>
                    Dashboard Stats
                  </Typography>
                </Paper>
                <div
                  style={{
                    flex: 1,
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4">
                    <strong>{deviceCount}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Devices
                  </Typography>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #2e8b57 0%, #3cb371 100%)",
                    color: "white",
                    padding: "16px",
                  }}
                >
                  <HiCpuChip style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" gutterBottom>
                    Desktops
                  </Typography>
                </Paper>
                <div
                  style={{
                    flex: 1,
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4">
                    <strong>{desktopCount}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Desktop Computers
                  </Typography>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #1e90ff 0%, #4169e1 100%)",
                    color: "white",
                    padding: "16px",
                  }}
                >
                  <FaLaptop style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" gutterBottom>
                    Laptops
                  </Typography>
                </Paper>
                <div
                  style={{
                    flex: 1,
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4">
                    <strong>{laptopCount}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Laptop Computers
                  </Typography>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #8a2be2 0%, #9932cc 100%)",
                    color: "white",
                    padding: "16px",
                  }}
                >
                  <FaMobileAlt style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" gutterBottom>
                    Mobile Phones
                  </Typography>
                </Paper>
                <div
                  style={{
                    flex: 1,
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4">
                    <strong>{phoneCount}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Mobile Devices
                  </Typography>
                </div>
              </Card>
            </Grid>
          </Grid>

          <Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card
                elevation={3}
                sx={{
                  marginTop: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #ff4500 0%, #ff8c00 100%)",
                    color: "white",
                    padding: "16px",
                  }}
                >
                  <FaChartPie style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" gutterBottom>
                    Device Chart
                  </Typography>
                </Paper>
                <div
                  style={{
                    flex: 1,
                    padding: "16px",
                    textAlign: "center",
                  }}
                  className={theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}
                >
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <div>{/* Render your Hero component here */}</div>
      )}
    </div>
  );
};

export default Home;
