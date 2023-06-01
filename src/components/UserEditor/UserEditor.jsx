// import { Box } from 'components/Box';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';

export const UserEditor = ({ users, user, onSubmit, close }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

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
    const id = user._id;
    if (users.find(user => user.email === email && user._id !== id)) {
      toast.warning(`${email} is already in users!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    onSubmit({ id: user._id, name, email, password });

    setName('');
    setEmail('');
    setPassword('');
    close();
  };
  return (
    <CardGroup
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#fff',
      }}
    >
      <Card style={{ padding: '20px' }}>
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
            Apply
          </Button>
          <Button
            variant="primary"
            style={{ marginLeft: '30px' }}
            type="button"
            onClick={() => {
              close();
            }}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </CardGroup>
  );
};
