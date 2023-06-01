import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRemoveUserMutation } from 'redux/users/users-api';

export const User = ({ id, name, email, password, open, getUserById }) => {
  const [removeUser, { isLoading: isDeleting }] = useRemoveUserMutation();
  return (
    <div>
      <p className="mb-2">
        <b>Name:</b> {name}
        <br />
      </p>
      <Button
        variant="outline-secondary"
        size="sm"
        type="button"
        onClick={() => {
          getUserById(id);
          open();
        }}
      >
        Докладно
      </Button>
      <Button
        variant="outline-secondary"
        size="sm"
        type="button"
        disabled={isDeleting}
        onClick={() => {
          removeUser(id);
        }}
      >
        Видалити
      </Button>
    </div>
  );
};

User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
