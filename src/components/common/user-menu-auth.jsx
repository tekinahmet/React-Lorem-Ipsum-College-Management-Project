import React, { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { swalConfirm } from "../../helpers/swal";
import { signOut } from "../../store/slices/auth-slice";
// import { removeLocalStorage } from "../../helpers/encrypted-storage";

const UserMenuAuth = () => {
  const [show, setShow] = useState(false);
  const { user, userMenu } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); //merkezi state de degisiklik yapmak istiyorsak useDispatch hook kullaniyoruz, dispatch reducer i calistirir
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await swalConfirm("Are you sure you want to logout?");
    if (!response.isConfirmed) return;
    dispatch(signOut());
    localStorage.removeItem("token");
    // removeLocalStorage("token");
    navigate("/");
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShow((prev) => !prev)}>
        <FaUser /> {user.name}
      </Button>

      <Offcanvas
        className="bg-secondary"
        show={show}
        onClick={() => setShow(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton className="bg-primary" style={{height: "46px"}}>
          <Offcanvas.Title >MENU</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            {userMenu.map((item) => (
              <Nav.Link as={Link} to={item.link} key={item.title}>
                {item.title}
              </Nav.Link>
            ))}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserMenuAuth;
