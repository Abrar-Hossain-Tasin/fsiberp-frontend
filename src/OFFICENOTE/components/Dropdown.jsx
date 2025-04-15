import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Logout from "@mui/icons-material/Logout";
import { Base_api } from "../../utils/api/Base_api";
import ChangePasswordModal from "../../component/ChangePasswordModal";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dropdown = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal visibility
  const openModal = () => setIsModalOpen(true);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    setIsModalOpen(true); // Open the modal
    handleClose(); // Close the dropdown
  };

  React.useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${Base_api}/api/users/${userid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [userid]);
  // Base menu items
  let baseMenuItems = [
    {
      text: "Profile",
      icon: <Avatar sx={{ width: 30, height: 30, color: "blue.500" }} />,
      onClick: () => {
        navigate("/erp-profile");
      },
    },
    {
      text: "Change Password",
      icon: <KeyOutlinedIcon />,
      onClick: openModal,
    },

    {
      divider: true,
    },
  ];
  // Add the Logout item at the end
  baseMenuItems.push({
    text: "Logout",
    icon: <Logout fontSize="small" />,
    onClick: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("activeTable");
      navigate("/");
    },
  });

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                bgcolor: username ? "white" : "grey.500",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {username ? username.slice(0, 1) : "X"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {baseMenuItems.map((item, index) => (
          <Box key={index}>
            {item.divider && <Divider />}
            <MenuItem
              onClick={
                item.text === "Change Password"
                  ? handleChangePassword
                  : item.onClick || handleClose
              }
              sx={{ fontWeight: "bold" }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              {item.text}
            </MenuItem>
          </Box>
        ))}
      </Menu>

      {/* Render the ChangePasswordModal */}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="Change Password"
      />
    </>
  );
};
export default Dropdown;
