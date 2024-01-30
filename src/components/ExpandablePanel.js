import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

const ExpandablePanel = ({ header, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className='mb-2 border rounded'>
            <div className='flex p-2 justify-between items-center'>
                <div className='flex justify-between items-center'>
                    {header}
                </div>
                <div
                    className='cursor-pointer' 
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? <GoChevronDown /> : <GoChevronLeft />}
                </div>
            </div>
            {expanded && (
                <div className='p-2 border-t'>
                    {children}
                </div>
            )}
        </div>
    );
}

ExpandablePanel.propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
};

export default ExpandablePanel;
