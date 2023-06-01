import { useState } from 'react';

import { UserForm } from 'components/UserForm/UserForm';
import { UserList } from 'components/UserList/UserList';
import { Filter } from 'components/Filter/Filter';
import { UserEditor } from 'components/UserEditor/UserEditor';

import { useSelector, useDispatch } from 'react-redux';
import { getFilter, setFilter } from 'redux/userlistSlice';

import {
  useAddUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from 'redux/users/users-api';
import { Card, CardGroup, Container } from 'react-bootstrap';

import { useToggle } from 'hooks/useToggle';

const UsersView = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { isOpen, open, close } = useToggle();

  const filter = useSelector(getFilter);
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useGetAllUsersQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const [addUser] = useAddUserMutation();

  const [updateUser] = useUpdateUserMutation();

  //get users list by filter
  const getFilteredUsers = () => {
    if (filter.trim()) {
      return users.filter(user => {
        return user.name.toLowerCase().includes(filter.toLowerCase());
      });
    } else return users;
  };

  const getUserById = id => {
    setUser(users.find(user => user._id === id));
  };

  //redux actions
  const handleAddUser = ({ name, email, password }) => {
    addUser({ name, email, password });
  };

  const handleUpdateUser = ({ id, name, email, password }) => {
    updateUser({ userId: id, name, email, password });
  };

  const updateFilter = e => {
    dispatch(setFilter(e.target.value));
  };
  //------------------

  const filteredUsers = getFilteredUsers();

  return (
    <Container
      className="mt-2"
      style={{
        position: 'relative',
      }}
    >
      {isOpen && (
        <UserEditor
          users={users}
          user={user}
          close={close}
          onSubmit={handleUpdateUser}
        />
      )}

      {!isLoading && isSuccess && (
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>New user</Card.Title>
              <UserForm users={users} onSubmit={handleAddUser}></UserForm>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Your users</Card.Title>
              <Filter name={filter} onChange={updateFilter}></Filter>
              <UserList
                users={filteredUsers}
                open={open}
                getUserById={getUserById}
              />
            </Card.Body>
          </Card>
        </CardGroup>
      )}
    </Container>
  );
};

export default UsersView;
