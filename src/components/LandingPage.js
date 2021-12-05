import React, { useState, useEffect } from "react";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import CardComponent from "./CardComponent";
import axios from "axios";

const DataListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; // in the palce of Media query for responsiveness
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const LandingPage = () => {
  const [medicalData, updateMedicalData] = useState([]);
  const [medicalTag, updateMedicalTag] = useState("");
  const [favState, updatefavState] = useState(false);
  const [lcData, updateLcData] = useState([]);

  const checkTags = (val) => {
    if (medicalTag === "") return 1;
    const arr = val.tags.filter((x) => x === medicalTag);
    if (arr.length > 0) return 1;
    else return 0;
  };

  useEffect(() => {
    axios
      .get(`https://video-api-dot-dj-virtual-spaces.el.r.appspot.com`)
      .then((response) => updateMedicalData(response))
      .then((response) => console.log(response));
  }, []);

  const localData = [];
  const setfavState = (val) => {
    updatefavState(val);
    allStorage();
  };
  const allStorage = () => {
    localData.length = 0;
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      localData.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    updateLcData(localData);
  };

  return (
    <Container>
     <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/photos/stethoscope-or-phonendoscope-on-a-doctors-white-desk-on-cloudy-of-picture-id1137049930?b=1&k=20&m=1137049930&s=170667a&w=0&h=9fvX8OT8qd0Vy83ReWRj9hME_ye27OmKR9dk02K_H5w="
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/photos/young-doctor-visits-senior-woman-with-surgical-mask-picture-id1284869164?b=1&k=20&m=1284869164&s=170667a&w=0&h=TPgUQkJOJ1yII5l5SC8LstdHmhRhvPQXq-N9J8I6MNI="
            alt="Second slide"
          />
         <Carousel.Caption>
            <h5>Second slide label</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/photos/woman-running-on-mountain-picture-id1312239440?b=1&k=20&m=1312239440&s=170667a&w=0&h=FseqyEenMDrp2g9FtQYVbOzgs3oOwblS1XSLFw4yo6s="
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container
        style={{
          padding: "5px",
        }}
      >
        <Row className="text-center">
          <Col>
        <Button
          onClick={() => setfavState(!favState)}
          variant="warning"
          style={{ margin: "2px" }}
        >
          Favourites
        </Button>
        {medicalData.data
          ? ["asthma", "tb", "copd", "cancer", "bp", "heart", "diabetes"].map(
              (x) => (
                <Button
                  onClick={() => updateMedicalTag(x)}
                  variant="outline-primary"
                  style={{ margin: "2px" }}
                >
                  {x}
                </Button>
              )
            )
          : null}
        <Button onClick={() => updateMedicalTag("")} variant="danger">
          clear
        </Button>
        </Col>
        </Row>
      </Container>

      <DataListContainer>
        {favState && localData ? (
          lcData.map((val, index) => (
            <CardComponent key={index} data={val} idx={index} />
          ))
        ) : medicalData.data ? (
          medicalData.data.videosData.map((val, index) =>
            checkTags(val) ? (
              <CardComponent key={index} data={val} idx={index} />
            ) : null
          )
        ) : (
          <Placeholder src="../../public/logo192.png" />
        )}
      </DataListContainer>
    </Container>
  );
};

export default LandingPage;
