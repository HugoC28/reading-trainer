import styled from "styled-components";
import { useState } from "react";
import useToast from "../hooks/useToast";
import Modal from "@mui/material/Modal";
import storageService from "../services/storageService";
import { useSelector } from "react-redux";

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 400px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #e5e1e1;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  font-family: "Acme", sans-serif;
  color: #bcbcbc;
`;

const Label = styled.label`
  color: #596780;
  text-align: left;
  font-weight: bold;
  font-family: "Acme", sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #ff9e58;
  color: white;
  border: none;
  font-family: "Acme", sans-serif;
  width: 100px;
  border-radius: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #ffcf53;
  }
`;

// eslint-disable-next-line react/prop-types
const NewPatientPopup = ({ openModal, setOpenModal, fetchPatients }) => {
  const user = useSelector((state) => state.user.currentUser);

  const { notify } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    parents: "",
    difficulties: "",
    interests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      parents: "",
      difficulties: "",
      interests: "",
    });
  };

  const handleCreate = async () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.age ||
      !formData.parents ||
      !formData.difficulties ||
      !formData.interests
    ) {
      notify("Please fill in all fields");
      return;
    }

    const response = await storageService.createPatient(user.uid, formData);
    if (response.success) {
      fetchPatients();
      notify(response.message);
    } else {
      notify(response.errorMessage);
    }

    handleClose();
  };

  const handleClose = () => {
    handleClear();
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      disableAutoFocus={true}
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        padding: "20px",
      }}
    >
      <ModalContainer>
        <Label htmlFor="name">Patient full name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Patient's full name"
          value={formData.name}
          onChange={handleChange}
        />
        <Label htmlFor="age">Patient age</Label>
        <Input
          type="text"
          name="age"
          placeholder="Patient's age"
          value={formData.age}
          onChange={handleChange}
        />

        <Label htmlFor="parents">Parent names</Label>
        <Input
          type="text"
          name="parents"
          placeholder="Parent names"
          value={formData.parents}
          onChange={handleChange}
        />
        <Label htmlFor="difficulties">Difficulties</Label>
        <Input
          type="text"
          name="difficulties"
          placeholder="Add difficulties (separated by comma)"
          value={formData.difficulties}
          onChange={handleChange}
        />

        <Label htmlFor="interest">Interests</Label>
        <Input
          type="text"
          name="interests"
          placeholder="Add interests (separated by comma)"
          value={formData.interests}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleClear}>Clear </Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default NewPatientPopup;
