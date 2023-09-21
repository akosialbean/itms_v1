import React, { useEffect, useState } from "react";
import { Container, Card, Row, Button, Col, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };  

  useEffect(() => {
    getTickets().then((response) => {
      setTickets(response.data);
    });
  }, []);

  return (
    <Container>
      <Card>
        <Card.Header>
          <Card.Title>Tickets</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={12} lg={12} className="justify-content-end">
              <Button variant="success" className="btn-sm">
                {/* Use Link to navigate to the create ticket page */}
                <Link to="/tickets/add">Create Ticket</Link>
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Tickets;
