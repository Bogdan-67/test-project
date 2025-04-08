import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const fetchItem = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/items/${id}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${text}`);
      }
      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error('Failed to fetch item', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.API_URL}/items/${id}`)
  //     .then(res => {
  //       if (!res.ok) {
  //         return res.text().then(text => {
  //           throw new Error(`${res.status}: ${text}`);
  //         });
  //       }
  //       return res.json();
  //     })
  //     .then(data => setItem(data))
  //     .catch(err => {
  //       console.error('Failed to fetch item', err);
  //       setError(err.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>

  if (!item) return <div>Item not found</div>

  return (
    <div className="detail">
        <Link to={'/'}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;
