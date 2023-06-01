import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { Box } from 'components/Box';

export const UserForm = ({ users, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const currentInputName = e.currentTarget.name;
    switch (currentInputName) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'email':
        setEmail(e.currentTarget.value);
        break;
      case 'password':
        setPassword(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (users.find(user => user.email === email)) {
      toast.warning(`${email} is already in users!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    onSubmit({ name, email, password });

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>User name</Form.Label>

          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces."
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>User email</Form.Label>
          <Form.Control
            type="mail"
            name="email"
            value={email}
            onChange={handleChange}
            pattern="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>User password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            minLength="8"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add user
        </Button>
      </Form>
    </Box>
  );
};

UserForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string.isRequired,
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
