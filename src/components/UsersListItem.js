import { GoTrashcan } from 'react-icons/go';
import { useRemoveUserMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
    const [removeUser, results] = useRemoveUserMutation();

    const header = (
        <>
            <Button 
                className='mr-3'
                loading={results.isLoading} 
                onClick={() => removeUser(user)}
            >
                <GoTrashcan />
            </Button>
            {user.name}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;