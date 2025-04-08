import React, { memo, useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import useData from './useData';
import useSort from './useSort';

const SubTitle: React.FC<{children: number | string}> = memo(({children}) => (
    <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
))

function ListPage() {
    const items = useData();
    const [sortedItems, sortBy, handleSortClick] = useSort(items);
    const [activeItemId,  setActiveItemId] = useState<number | null>(null);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('');
    const activeItemText = useMemo(() => typeof activeItemId === 'number' ? activeItemId : 'Empty', [activeItemId]);
    
    const handleItemClick = useCallback((id: number) => {
        setActiveItemId(id);
    }, []);
    
    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }
    
    useEffect(() => {
        setFilteredItems(sortedItems);
    }, [sortedItems]);
  
    useEffect(() => {
        if (query.length > 0) {
            setFilteredItems(filteredItems.filter(item => `${item.id}`.includes(query.toLowerCase().trimStart().trimEnd().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
        }
    }, [query, filteredItems]);

  return (
    <div className={'list-wrapper'}>
        <div className="list-header">
            <h1 className={'list-title'}>Items List</h1>
            <SubTitle>{activeItemText}</SubTitle>
            <button onClick={handleSortClick}>Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})</button>
            <input type="text" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange} />
        </div>
        <div className="list-container">
            <div className="list">
                {filteredItems.length === 0 && <span>Loading...</span>}
                {filteredItems.map((item) => (
                    <ListItem
                        key={item.id}
                        isactive={activeItemId===item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        onClick={handleItemClick}
                    />
                ))}
            </div>
        </div>
    </div>
  );
}

export default memo(ListPage);
