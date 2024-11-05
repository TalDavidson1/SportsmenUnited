import { Post, CreatePostData, PostFilter } from '../types';

// Mock data for testing
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    title: '8-Point Buck',
    description: 'Beautiful morning harvest in Warren County',
    location: {
      latitude: 38.9072,
      longitude: -78.1861,
      name: 'Warren County, VA'
    },
    species: 'Whitetail Deer',
    imageUrl: 'https://placeholder.com/deer1',
    likes: 24,
    createdAt: new Date(2024, 0, 15).toISOString()
  },
  {
    id: '2',
    userId: 'user2',
    title: 'Personal Best Bass',
    description: 'Caught this monster at Smith Mountain Lake',
    location: {
      latitude: 37.0433,
      longitude: -79.7200,
      name: 'Smith Mountain Lake, VA'
    },
    species: 'Largemouth Bass',
    imageUrl: 'https://placeholder.com/bass1',
    likes: 18,
    createdAt: new Date(2024, 0, 14).toISOString()
  }
];

export class PostService {
  private posts: Post[] = MOCK_POSTS;

  async getPosts(filter?: PostFilter): Promise<Post[]> {
    let filteredPosts = [...this.posts];

    if (filter) {
      if (filter.species) {
        filteredPosts = filteredPosts.filter(post =>
          filter.species?.includes(post.species)
        );
      }

      if (filter.location) {
        filteredPosts = filteredPosts.filter(post => {
          const distance = this.calculateDistance(
            filter.location!.latitude,
            filter.location!.longitude,
            post.location.latitude,
            post.location.longitude
          );
          return distance <= filter.location!.radiusKm;
        });
      }
    }

    return filteredPosts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createPost(data: CreatePostData): Promise<Post> {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'currentUser', // TODO: Replace with actual user ID
      ...data,
      likes: 0,
      createdAt: new Date().toISOString()
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  async likePost(postId: string): Promise<Post> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      throw new Error('Post not found');
    }

    post.likes += 1;
    return post;
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export const postService = new PostService();
