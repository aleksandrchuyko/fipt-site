import { User } from 'components/UserList/User/User';
import PropTypes from 'prop-types';
import { Container, ListGroup } from 'react-bootstrap';

export const UserList = ({ users, open, getUserById }) => {
  return (
    <Container>
      <ListGroup variant="flush">
        {users.map(user => (
          <ListGroup.Item key={user._id}>
            <User
              id={user._id}
              name={user.name}
              email={user.email}
              password={user.password}
              open={open}
              getUserById={getUserById}
            ></User>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      owner: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};
