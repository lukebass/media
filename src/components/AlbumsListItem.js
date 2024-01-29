import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const header = (
        <>
            <Button 
                className='mr-3'
                loading={results.isLoading} 
                onClick={() => removeAlbum(album)}
            >
                <GoTrashcan />
            </Button>
            {album.title}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    );
}

export default AlbumsListItem;