/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.module.scss";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";
import { userLogout } from "../../store/users/user.actions";

const AdminNavbar = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Dispatch the action to update the store
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main" style={{ backgroundColor: "transparent" }}>
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar >
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                      src={user.profileImage}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold" style={{ color: "white" }}>
                      {user.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className={`dropdown-menu-arrow navbarM`} style={{ zIndex: 1000, top: "4rem", padding: 0 }}>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider /> */}
                <DropdownItem href=" " onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
