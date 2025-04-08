import { useMemo, useState } from 'react';

function useSort(items: readonly any[]): [any[], any, any] {
	const [sortBy, setSortBy] = useState('ASC');
	
	const sortedItems = useMemo(() => {
		if (sortBy === 'ASC') {
			return [...items];
		}
		
		if (sortBy === 'DESC') {
			return [...items].sort((a, b) => b.id - a.id);
		}
		
		return [...items];
	}, [items, sortBy]);
	
	const handleSortClick = () => {
		if (sortBy === 'ASC') {
			setSortBy('DESC');
		} else if (sortBy === 'DESC') {
			setSortBy('ASC');
		} else {
			setSortBy('');
		}
	}
	
	return [sortedItems, sortBy, handleSortClick];
}

export default useSort;
