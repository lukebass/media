import { useState } from 'react';
import { useFetchUsersQuery, useAddUserMutation } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem.js';

const UsersList = () => {
    const { data, error, isFetching } = useFetchUsersQuery();
    const [addUser, results] = useAddUserMutation();

    const [title, setTitle] = useState('');
    const handleChange = (event) => setTitle(event.target.value);
    const handleSubmit = (event) => {
        event.preventDefault();
        addUser(title);
        setTitle('');
    };

    let content;
    if (isFetching) content = <Skeleton times={6} className='h-10 w-full' />;
    else if (error) content = <div>Error Loading Users</div>;
    else content = data.map((user) => <UsersListItem key={user.id} user={user} />);

    return (
        <div>
            <div className='m-3 flex items-center justify-between'>
                <h1 className='m-2 text-xl font-bold'>Users</h1>
                <form className='flex items-center' onSubmit={handleSubmit}>
                    <input className='mr-2 border rounded' value={title} onChange={handleChange} />
                    <Button loading={results.isLoading}>+ Add User</Button>
                </form>
            </div>
            {content}
        </div>
    );
}

export default UsersList;