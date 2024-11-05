export interface Post {
  id: string;
  userId: string;
  title: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  species: string;
  imageUrl?: string;
  likes: number;
  createdAt: string;
}

export interface CreatePostData {
  title: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  species: string;
  imageUrl?: string;
}

export interface PostFilter {
  species?: string[];
  location?: {
    latitude: number;
    longitude: number;
    radiusKm: number;
  };
}

export type Species = {
  id: string;
  name: string;
  category: 'fish' | 'game';
};

export const MOCK_SPECIES: Species[] = [
  { id: '1', name: 'Whitetail Deer', category: 'game' },
  { id: '2', name: 'Turkey', category: 'game' },
  { id: '3', name: 'Largemouth Bass', category: 'fish' },
  { id: '4', name: 'Brook Trout', category: 'fish' },
  { id: '5', name: 'Black Bear', category: 'game' },
  { id: '6', name: 'Walleye', category: 'fish' },
  { id: '7', name: 'Elk', category: 'game' },
  { id: '8', name: 'Rainbow Trout', category: 'fish' },
];
