import UserMenu from 'components/UserMenu/UserMenu';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { Link, NavLink } from 'react-router-dom';

const SiteHeader = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="text-primary" as={Link} to="register">
          Сервіси деканату ФІПТ
        </Navbar.Brand>
        <Nav>
          {!isLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="register" key="register">
                Реєстрація
              </Nav.Link>
              <Nav.Link as={NavLink} to="login" key="login">
                Вхід
              </Nav.Link>
            </>
          )}
        </Nav>
        {isLoggedIn && <UserMenu />}
      </Container>
    </Navbar>
  );
};
export default SiteHeader;
