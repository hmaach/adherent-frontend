import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeselectIcon from "@mui/icons-material/Deselect";
import { CgMoreAlt } from "react-icons/cg";
import { AddBox, AddIcCallOutlined, Delete } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import GetCookie from "../../../cookies/JWT/GetCookie";

export default function CustomizedMenus({handleAddCallback,handleUpdateCallback}) {
  const handleAdd = () => {
      handleAddCallback();
      handleClose();
    // console.log('salam');
  };
  const handleUpdate = () => {
    handleUpdateCallback();
    handleClose();
  // console.log('salam');
};

  const token = GetCookie("jwt");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [err, setErr] = useState();
  //   const [postTypeModif, setPostTypeModif] = useState(post.type);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    // onSubmit(post);
    setAnchorEl(null);
  };
  return (
    <div className="announces-menu">
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<CgMoreAlt />}
      ></Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleAdd}
          disableRipple
        >
          <AddBox />
          Ajouter
        </MenuItem>
        <MenuItem
          onClick={handleUpdate}
          disableRipple
        >
          <EditIcon />
          Modifier
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

{
  /* <AlertDialogSlide
    post={post}
    open={openDialog}
    handleClose={() => setOpenDialog(false)}
    handleUpdatePost={handleUpdatePost}
    postType={postTypeModif}
/> */
}
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
