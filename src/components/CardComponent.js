import React, { useState } from "react";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import { Button } from "react-bootstrap";


const MedicalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MedicalName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MedicalInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const CardComponent = (props) => {  
  const { title, thumbnailUrl, description, videolink } = props.data;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);


  const setData = (data) => {
    localStorage.setItem(data.idx, JSON.stringify(data.data));
  }
  return (
    <MedicalContainer>
      {show ? <ModalComponent videolink={videolink } Title = {title} description = {description} /> : null }
      <Button variant="warning" onClick={() => setData(props)}>Add to Favourites</Button>
      <CoverImage src={thumbnailUrl} alt={title} onClick={handleShow}/>
      <MedicalName>{title}</MedicalName>
      <InfoColumn>
        <MedicalInfo>{description}</MedicalInfo>
      </InfoColumn>
      
    </MedicalContainer>
  );
};
export default CardComponent;