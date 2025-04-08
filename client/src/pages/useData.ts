import { useEffect, useState } from 'react';

function useData(): [any[], boolean, string | undefined] {
	const [items, setItems] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>();
	
	async function fetchItems() {
		setIsLoading(true);
		try {
			const res = await fetch(`${process.env.API_URL}/items`);
			if (!res.ok) {
				const text = await res.text();
				throw new Error(`${res.status} ${res.statusText}: ${text}`);
			}
			const data = await res.json();
			setItems(data);
		} catch (err) {
			console.error('Failed to fetch items', err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}
	
	useEffect(() => {
		fetchItems();
		setInterval(fetchItems, 10000);
	}, []);
	
	return [items, isLoading, error];
}

export default useData;
