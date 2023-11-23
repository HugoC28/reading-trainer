import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

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

const ForgotPasswordLink = styled.a`
  text-align: right;
  width: 100%;
  margin-top: 5px;
  color: #596780;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  margin-top: 50px;
  background-color: #ff9e58;
  color: white;
  border-radius: 25px;
  border: none;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;

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
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "100px"};
  transform: rotate(${(props) => props.rotate || "0"}deg);
  position: absolute;
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
`;

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (await authService.isValidLogin(email, password)) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
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
        <ForgotPasswordLink href="#">Forgot your password?</ForgotPasswordLink>
        <Button type="submit">Log in</Button>
        <p style={{ color: "#9AA1A9" }}>
          Dont have an account? <StyledLink to="/signin">Sign up</StyledLink>
        </p>
      </Form>

      <Image
        src="../../images/Frog  3D Illustration 1.png"
        alt="Frog"
        rotate={20}
        width="450px"
        height="450px"
        left="-100px"
        bottom="-130px"
      />
      <Image
        src="../../images/Bird  3D Illustration 1.png"
        alt="Bird"
        width="350px"
        height="350px"
        left="130px"
        bottom="-100px"
      />
      <Image
        src="../../images/Rabbit  3D Illustration 1.png"
        alt="Rabbit"
        width="300px"
        height="300px"
        left="350px"
        bottom="-90px"
      />
      <Image
        src="../../images/Bird  3D Illustration 2.png"
        alt="Bird2"
        width="300px"
        height="300px"
        left="570px"
        bottom="-90px"
      />

      <Image
        src="../../images/Fox  3D Illustration 1.png"
        alt="Fox"
        width="350px"
        height="350px"
        left="800px"
        bottom="-90px"
      />

      <Image
        src="../../images/Bear  3D Illustration 1.png"
        alt="Bear"
        rotate={-20}
        width="450px"
        height="450px"
        left="1050px"
        bottom="-105px"
      />
    </Container>
  );
};

export default LoginForm;
