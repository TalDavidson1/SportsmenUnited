import { Post, CreatePostParams, PostFilter } from '../types';

// Mock data for initial testing
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'harvest',
    species: 'Whitetail Deer',
    location: {
      latitude: 38.9072,
      longitude: -77.0369,
      name: 'Warren County, VA'
    },
    date: new Date().toISOString(),
    imageUrl: 'https://placeholder.com/deer1',
    description: '8-Point Buck',
    likes: 24,
    comments: []
  },
  {
    id: '2',
    userId: 'user2',
    type: 'catch',
    species: 'Largemouth Bass',
    location: {
      latitude: 37.1031,
      longitude: -79.5037,
      name: 'Smith Mountain Lake, VA'
    },
    date: new Date().toISOString(),
    imageUrl: 'https://placeholder.com/bass1',
    description: 'Lake Trophy Bass',
    likes: 18,
    comments: []
  }
];

class SocialService {
  private posts: Post[] = MOCK_POSTS;

  async getPosts(filter?: PostFilter): Promise<Post[]> {
    let filteredPosts = [...this.posts];

    if (filter) {
      if (filter.type) {
        filteredPosts = filteredPosts.filter(post => post.type === filter.type);
      }

      if (filter.species) {
        filteredPosts = filteredPosts.filter(post => post.species === filter.species);
      }

      if (filter.location) {
        filteredPosts = filteredPosts.filter(post => {
          const distance = this.calculateDistance(
            filter.location!.latitude,
            filter.location!.longitude,
            post.location.latitude,
            post.location.longitude
          );
          return distance <= filter.location.radiusKm;
        });
      }

      if (filter.dateRange) {
        const startDate = new Date(filter.dateRange.start);
        const endDate = new Date(filter.dateRange.end);
        filteredPosts = filteredPosts.filter(post => {
          const postDate = new Date(post.date);
          return postDate >= startDate && postDate <= endDate;
        });
      }
    }

    return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createPost(params: CreatePostParams): Promise<Post> {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'currentUser', // TODO: Replace with actual user ID from auth
      ...params,
      date: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  async likePost(postId: string): Promise<void> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
    }
  }

  async addComment(postId: string, text: string): Promise<void> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments.push({
        id: Date.now().toString(),
        userId: 'currentUser', // TODO: Replace with actual user ID from auth
        text,
        date: new Date().toISOString()
      });
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

export const socialService = new SocialService();
