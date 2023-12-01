import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import useToast from "../hooks/useToast";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffcf53;
  overflow: hidden;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  border: 1px solid #e5e1e1;
  border-radius: 10px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  z-index: 2;
`;

const Input = styled.input`
  width: 250px;
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
  width: 100%;
  font-weight: bold;
  font-family: "Acme", sans-serif;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  margin-top: 30px;
  background-color: #ff9e58;
  color: white;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffcf53;
  }
`;

const StyledLink = styled(Link)`
  color: #596780;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const Logo = styled.img`
  width: 220px;
  position: absolute;
  top: 50px;
  left: 50px;
`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { notify } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await authService.isValidSignup(formData);

    if (response.success) {
      navigate("/login");
      notify(
        `Signing up successful! Login with your credentials.`,
        "success",
        "#ffeab4"
      );
    } else {
      notify(`Signing up failed: ${response.errorMessage}`, "error");
    }
  };

  return (
    <Container>
      <Logo src="../../images/Logo.png" alt="Logo" />

      <Form onSubmit={handleSignUp}>
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <Label htmlFor="firstName">First name</Label>
        <Input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <Label htmlFor="lastName">Last name</Label>
        <Input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <Button type="submit">Sign up</Button>
        <p style={{ color: "#9AA1A9" }}>
          Already have an account? <StyledLink to="/login">Log in</StyledLink>
        </p>
      </Form>

      <Image src="../../images/Animals.png" alt="Background" />
    </Container>
  );
};

export default SignUpForm;
