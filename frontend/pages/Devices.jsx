import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaDesktop,
  FaLaptop,
  FaMobileAlt,
  FaPlusCircle,
  FaRobot,
  FaServer,
  FaSearch,
} from "react-icons/fa";
import DeviceNav from "../src/components/DeviceNav";

const Devices = () => {
  // PULLING DATA USING AXIOS
  const getDevices = () => {
    return axios.get("http://localhost:8000/api/devices");
  };

  const [devices, setDevices] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    getDevices().then((response) => {
      setDevices(response.data);
    });
  }, []);

  // SEARCH RECORD

  return (
    <Container className="container-fluid">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DeviceNav />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Container>
            <Card className="border border-primary shadow border border-3">
              <Typography
                variant="h4"
                component="div"
                className="bg-primary p-3 text-light"
              >
                <strong>Devices</strong>
              </Typography>
              <Card sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <LinkContainer to="/devices/add">
                      <Button
                        variant="contained"
                        color="success"
                        style={{ width: "100%" }}
                        startIcon={<FaPlusCircle />}
                      >
                        Add Device
                      </Button>
                    </LinkContainer>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Search here"
                      value={searchItem}
                      onChange={(e) => setSearchItem(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <FaSearch />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <hr />
                {/* AXIOS */}
                {devices.length > 0 ? (
                  <Grid container spacing={3}>
                    {devices
                      .filter(
                        (device) =>
                          device.d_hostName
                            .toLowerCase()
                            .includes(searchItem) ||
                          (device.d_type &&
                            device.d_type.toLowerCase().includes(searchItem)) ||
                          (device.d_brand &&
                            device.d_brand
                              .toLowerCase()
                              .includes(searchItem)) ||
                          (device.d_model &&
                            device.d_model
                              .toLowerCase()
                              .includes(searchItem)) ||
                          (device.d_ipAddress &&
                            device.d_ipAddress.includes(searchItem)) ||
                          (device.d_assignedToDepartment &&
                            device.d_assignedToDepartment
                              .toLowerCase()
                              .includes(searchItem)) ||
                          (device.d_assignedToEmployee &&
                            device.d_assignedToEmployee
                              .toLowerCase()
                              .includes(searchItem))
                      )
                      .map((device) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={3}
                          key={device._id}
                        >
                          <LinkContainer
                            to={`/devices/device/${device._id}`}
                            style={{ width: "100%" }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              className="shadow"
                              style={{ width: "100%" }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                  {device.d_type === "Laptop" ? (
                                    <FaLaptop fontSize="large" />
                                  ) : (
                                    ""
                                  )}
                                  {device.d_type === "Desktop" ? (
                                    <FaDesktop fontSize="large" />
                                  ) : (
                                    ""
                                  )}
                                  {device.d_type === "Phone" ? (
                                    <FaMobileAlt fontSize="large" />
                                  ) : (
                                    ""
                                  )}
                                  {device.d_type === "Server" ? (
                                    <FaServer fontSize="large" />
                                  ) : (
                                    ""
                                  )}
                                  {device.d_type === "Mini PC" ? (
                                    <FaRobot fontSize="large" />
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                                <Grid
                                  item
                                  xs={8}
                                  sm={8}
                                  md={8}
                                  lg={8}
                                  sx={{ minWidth: "180px", minHeight: "180px" }}
                                >
                                  <div className="h5 mb-4">
                                    <strong>{device.d_hostName}</strong>
                                  </div>
                                  <div>{device.d_ipAddress}</div>
                                  <div>{device.d_assignedToDepartment}</div>
                                  <div>{device.d_assignedToEmployee}</div>
                                </Grid>
                              </Grid>
                            </Button>
                          </LinkContainer>
                        </Grid>
                      ))}
                  </Grid>
                ) : (
                  <Typography variant="h5">Loading...</Typography>
                )}
                {/* END AXIOS */}
              </Card>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Devices;
