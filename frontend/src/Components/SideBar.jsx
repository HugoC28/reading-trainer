import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { BsBarChartLineFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiSettingsLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import authService from "../services/authService";
import useToast from "../hooks/useToast";

const SidebarContainer = styled.div`
  background-color: #ffeab4;
  color: #596780;
  width: 200px;
`;

const TitleContainer = styled.div`
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 10px;
  margin-right: 10px;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;

  &.active {
    color: white;
    background-color: #ff9e58;
    border-radius: 10px;
  }
`;

const SmallText = styled.h3`
  font-family: "Acme", sans-serif;
  font-size: 0.5em;
  font-weight: 400;
  color: #90a3bf;
`;

const MediumText = styled.h2`
  font-family: "Acme", sans-serif;
  font-size: 0.8em;
  font-weight: 400;
  color: #596780;

  .active & {
    color: white;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 80%;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const { notify } = useToast();

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await authService.isValidLogout();

    if (response.success) {
      notify(`Successfully logged out.`, "success");
      navigate("/login");
    } else {
      notify(
        `There is a problem with logout: ${response.errorMessage}`,
        "error"
      );
    }
  };

  return (
    <SidebarContainer>
      <TitleContainer>
        <Logo src="../../images/Logo.png" alt="Logo" />
      </TitleContainer>

      <MenuContainer>
        <SmallText>Main Menu</SmallText>

        <StyledLink to={"/"}>
          <IconItem>
            <BsBarChartLineFill></BsBarChartLineFill>
            <MediumText>Dashboard</MediumText>
          </IconItem>
        </StyledLink>

        <StyledLink to={"/patients"}>
          <IconItem>
            <HiOutlineDocumentText></HiOutlineDocumentText>
            <MediumText>Child Profile Management</MediumText>
          </IconItem>
        </StyledLink>

        <StyledLink to={"/calendar"}>
          <IconItem>
            <IoCalendarOutline></IoCalendarOutline>
            <MediumText>Calendar</MediumText>
          </IconItem>
        </StyledLink>
      </MenuContainer>

      <MenuContainer>
        <SmallText>Preferences</SmallText>

        <StyledLink to={"/settings"}>
          <IconItem>
            <RiSettingsLine></RiSettingsLine>
            <MediumText>Settings</MediumText>
          </IconItem>
        </StyledLink>

        <StyledLink to={"/help"}>
          <IconItem>
            <IoIosHelpCircleOutline></IoIosHelpCircleOutline>
            <MediumText>Help & Center</MediumText>
          </IconItem>
        </StyledLink>
      </MenuContainer>

      <MenuContainer>
        <SmallText>User</SmallText>
        <IconItem>
          <BiUserCircle></BiUserCircle>
          <MediumText>Tester</MediumText>
        </IconItem>
        <LogoutButton onClick={handleLogout}>
          <IconItem>
            <CiLogout></CiLogout>
            <MediumText>Log Out</MediumText>
          </IconItem>
        </LogoutButton>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default SideBar;
