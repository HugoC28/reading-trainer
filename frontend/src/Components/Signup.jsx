import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../config/authconfig";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;

  border: 2px solid #a5a5a5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  background-color: white;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #e5e1e1;
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
  margin-top: 73px;
  background-color: #596780;
  color: white;
  border: 1px solid black;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background-color: #9099a8;
  }
`;

const StyledLink = styled(Link)`
  color: #596780;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const auth = getAuth(firebaseApp);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign Up successful!");
      navigate("/login");
    } catch (error) {
      alert("Signing Up failed");
      console.error(error);
    }
  };

  return (
    <Container>
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
        <Button type="submit">Sign up</Button>
        <p style={{ color: "#9AA1A9" }}>
          Already have an account? <StyledLink to="/login">Log in</StyledLink>
        </p>
      </Form>
    </Container>
  );
};

export default SignUpForm;
