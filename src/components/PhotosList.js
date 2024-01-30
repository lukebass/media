import PropTypes from 'prop-types';
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

const PhotosList = ({ album }) => {
    const { data, error, isFetching } = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    let content;
    if (isFetching) content = <Skeleton times={3} className='h-10 w-full' />;
    else if (error) content = <div>Error Loading Photos</div>;
    else content = data.map((photo) => <PhotosListItem key={photo.id} photo={photo} />);

    return (
        <div>
            <div className='m-2 flex items-center justify-between'>
                <h3 className='text-lg font-bold'>Photos in {album.title}</h3>
                <Button
                    loading={results.isLoading}
                    onClick={() => addPhoto(album)}
                >
                    + Add Photo
                </Button>
            </div>
            <div className='mx-8 flex flex-wrap justify-center'>{content}</div>
        </div>
    );
}

PhotosList.propTypes = {
    album: PropTypes.object
};

export default PhotosList;