import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';;

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
            List of photos
        </ExpandablePanel>
    );
}

export default AlbumsListItem;