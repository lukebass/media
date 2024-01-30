import PropTypes from 'prop-types';
import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

const AlbumsListItem = ({ album }) => {
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

AlbumsListItem.propTypes = {
    album: PropTypes.object
};

export default AlbumsListItem;