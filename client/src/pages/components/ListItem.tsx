import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface ListItemProps {
  id: number, 
  name: string, 
  description: string, 
  onClick: (id: number) => void, isactive: boolean
}

const ListItem: React.FC<ListItemProps> = ({ id, name, description, onClick, isactive }) => {
  return (
    <li className={isactive ? 'list-item active' : 'list-item'}>
        <Link to={`/${id}`}>
            <div className={'list-item-actions'}>
                <div>ID: <b>{id}</b></div>
                <Button onClick={onClick} id={id} disabled={isactive}>
                    {isactive ? 'Active' : 'Set Active'}
                </Button>
            </div>
            <div>{name}</div>
            <div className={'list-item__description'}>{description}</div>
        </Link>
    </li>
  );
};


export default memo(ListItem);
