import { Box } from 'components/Box';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const Filter = ({ name, onChange }) => {
  return (
    <Box>
      <Form>
        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Search</Form.Label>

          <Form.Control
            type="text"
            name="find"
            value={name}
            onChange={onChange}
          />
        </Form.Group>
      </Form>
    </Box>
  );
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
