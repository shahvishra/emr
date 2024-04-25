import "./App.css";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [patients, setPatients] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "Select",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Select",
    dob: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "Select",
    zip: "",
    referredBy: "",
  });
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setValidated(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      savePatientData();
      setValidated(true);
      handleClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const savePatientData = () => {
    fetch('http://localhost:3001/patients/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        loadPatientsData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const loadPatientsData = () => {
    fetch("http://localhost:3001/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data.patients));
  };

  useEffect(() => {
    loadPatientsData();
  }, []);

  return (
    <Container>
      <div className="App">
        <Stack direction="vertical" gap={3}>
          <Card style={{ marginTop: 1 + "rem", backgroundColor: "#ccccff" }}>
            <Card.Body>
              <h2>Electoronic Medical Records</h2>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Stack
                direction="horizontal"
                gap={3}
                style={{ textAlign: "center" }}
              >
                <div className="p-2">
                  <h5>
                    <b>Patients Information</b>
                  </h5>
                </div>
                <div className="p-2 ms-auto">
                  <Button variant="primary" onClick={handleShow}>
                    <FaUserPlus />
                  </Button>
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Phone number</th>
                  <th>Place of Birth</th>
                  <th>Referring Doctor</th>
                  <th>Actions</th>
                </tr>
                {patients.map((patient, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {patient.TITLECODE} {patient.FIRSTNAME}{" "}
                        {patient.MIDDLENAME} {patient.SURNAME}
                      </td>
                      <td>{formatDate(patient.DOB)}</td>
                      <td>{patient.SEXCODE}</td>
                      <td>
                        {patient.ADDRESS1}, {patient.ADDRESS2}, {patient.CITY}
                        {", "}
                        {patient.POSTCODE}
                      </td>
                      <td>{patient.HOMEPHONE}</td>
                      <td>
                        {patient.PLACEOFBIRTH}, {patient.COUNTRYOFBIRTH}
                      </td>
                      <td>{patient.REFERRINGDOCTOR}</td>
                      <td>
                        <Stack direction="horizontal" gap={3}>
                          <Button variant="danger">
                            <FaTrash />
                          </Button>
                        </Stack>
                      </td>
                    </tr>
                  );
                })}
              </Table>
            </Card.Body>
          </Card>
        </Stack>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Add Patient</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <h5>Basic Information</h5>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTitle" xs={2}>
                <Form.Label>Title</Form.Label>
                <Form.Select
                  defaultValue="Select"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Miss.</option>
                  <option>Dr.</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formMiddleName" xs={2}>
                <Form.Label>Middle Initial</Form.Label>
                <Form.Control
                  required
                  name="middleName"
                  type="text"
                  placeholder="Enter Middle Initial"
                  maxLength={1}
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  required
                  name="gender"
                  defaultValue="Select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option>Non Binary</option>
                  <option>Cisgender</option>
                  <option>Genderfluid</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                  <option>Gender Neutral</option>
                  <option>Agender</option>
                  <option>Pangender</option>
                  <option>Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Gender is a required field.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formDOB" xs={2}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  required
                  name="dob"
                  type="date"
                  placeholder="Select Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Date of Birth is a required field.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter Phone Number"
                  maxLength={10}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Phone number is a required field.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label htmlFor="referredBy">Referred By</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="addon">Dr.</InputGroup.Text>
                  <Form.Control
                    id="referredBy"
                    name="referredBy"
                    type="text"
                    placeholder="Referred By"
                    value={formData.referredBy}
                    onChange={handleChange}
                    aria-describedby="addon"
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <h5>Location</h5>

            <Row className="mb-3">
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="formAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address1"
                    placeholder="Street Address"
                    value={formData.address1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    name="address2"
                    placeholder="Apartment, studio, or floor"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    name="state"
                    defaultValue="Select"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    <option>New South Wales</option>
                    <option>Queensland</option>
                    <option>South Australia</option>
                    <option>Tasmania</option>
                    <option>Victoria</option>
                    <option>Western Australia</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="zip"
                    placeholder="Enter Zipcode"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
