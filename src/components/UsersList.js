import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem.js';
import { useThunk } from '../hooks/useThunk';

function UsersList() {
    const [doFetchUsers, isFetchingUsers, fetchingUsersError] = useThunk(fetchUsers);
    const [doAddUser, isAddingUser, addingUserError] = useThunk(addUser);
    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    let content;
    if (isFetchingUsers) content = <Skeleton times={6} className='h-10 w-full' />;
    else if (fetchingUsersError) content = <div>Error...</div>;
    else content = data.map((user) => <UsersListItem key={user.id} user={user} />);

    return (
        <div>
            <div className='flex justify-between items-center m-3'>
                <h1 className='m-2 text-xl'>Users</h1>
                <Button 
                    loading={isAddingUser} 
                    onClick={doAddUser}
                >
                    + Add User
                </Button>
                {addingUserError && 'Error Creating User'}
            </div>
            {content}
        </div>
    );
}

export default UsersList;