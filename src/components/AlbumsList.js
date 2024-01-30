import { useState } from 'react';
import PropTypes from 'prop-types';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const [title, setTitle] = useState('');
    const handleChange = (event) => setTitle(event.target.value);
    const handleSubmit = (event) => {
        event.preventDefault();
        addAlbum({ user, title });
        setTitle('');
    };
    
    let content;
    if (isFetching) content = <Skeleton times={3} className='h-10 w-full' />;
    else if (error) content = <div>Error Loading Albums</div>;
    else content = data.map((album) => <AlbumsListItem key={album.id} album={album} />);

    return (
        <div>
            <div className='m-2 flex items-center justify-between'>
                <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
                <form className='flex items-center' onSubmit={handleSubmit}>
                    <input className='mr-2 border rounded' value={title} onChange={handleChange} />
                    <Button loading={results.isLoading}>+ Add Album</Button>
                </form>
            </div>
            <div>{content}</div>
        </div>
    );
}

AlbumsList.propTypes = {
    user: PropTypes.object
};

export default AlbumsList;