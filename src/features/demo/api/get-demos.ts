import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

/*
{
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  }
*/

/**
 *
 * @returns
 */

interface DemoResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const demosQueryOptions = ({ limit }: { limit?: number } = {}) => {
  return queryOptions({
    queryKey: limit ? ['discussions', { limit }] : ['discussions'],
    queryFn: () => getDemos(limit),
  });
};

async function getDemos(limit?: number) {
  const response = await axios.get<DemoResponse[]>(
    'https://jsonplaceholder.typicode.com/albums/1/photos'
  );
  return response.data.slice(0, limit ?? 4);
}

export function useGetDemos() {
  return useQuery({
    queryKey: ['demos'],
    queryFn: () => getDemos(),
  });
}
