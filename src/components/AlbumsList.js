import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

function AlbumsList({ user }) {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    
    let content;
    if (isFetching) content = <Skeleton times={3} className='h-10 w-full' />;
    else if (error) content = <div>Error Loading Albums</div>;
    else content = data.map((album) => <AlbumsListItem key={album.id} album={album} />);

    return (
        <div>
            <div className='m-2 flex items-center justify-between'>
                <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
                <Button
                    loading={results.isLoading}
                    onClick={() => addAlbum(user)}
                >
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;