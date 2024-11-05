import SwiftUI
import CoreLocation

struct SocialFeedView: View {
    @StateObject private var viewModel = SocialFeedViewModel()
    @State private var showingPostCreation = false

    // Brand Colors
    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Filter Buttons
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        FilterButton(title: "All", isSelected: viewModel.selectedFilter == .all) {
                            viewModel.filterPosts(by: .all)
                        }
                        FilterButton(title: "Nearby", isSelected: viewModel.selectedFilter == .nearby) {
                            viewModel.filterPosts(by: .nearby)
                        }
                        FilterButton(title: "Fish", isSelected: viewModel.selectedFilter == .fish) {
                            viewModel.filterPosts(by: .fish)
                        }
                        FilterButton(title: "Game", isSelected: viewModel.selectedFilter == .game) {
                            viewModel.filterPosts(by: .game)
                        }
                    }
                    .padding()
                }
                .background(Color(.systemBackground))
                .shadow(color: Color.black.opacity(0.1), radius: 2, y: 2)

                // Posts List
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(viewModel.posts) { post in
                            PostCard(post: post)
                                .padding(.horizontal)
                        }
                    }
                    .padding(.top)
                }

                // Banner Ad Space
                BannerAdView()
                    .frame(height: 50)
                    .background(Color(.systemGray6))
            }
            .navigationTitle("Feed")
            .navigationBarItems(trailing: Button(action: {
                showingPostCreation = true
            }) {
                Image(systemName: "plus.circle.fill")
                    .foregroundColor(navyBlue)
                    .imageScale(.large)
            })
        }
        .sheet(isPresented: $showingPostCreation) {
            PostCreationView()
        }
    }
}

struct FilterButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    private let navyBlue = Color(hex: "1B2B5E")

    var body: some View {
        Button(action: action) {
            Text(title)
                .fontWeight(.medium)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(isSelected ? navyBlue : Color(.systemGray6))
                .foregroundColor(isSelected ? .white : .primary)
                .cornerRadius(20)
        }
    }
}

struct PostCard: View {
    let post: Post

    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack {
                Circle()
                    .fill(navyBlue)
                    .frame(width: 40, height: 40)
                VStack(alignment: .leading) {
                    Text("User Name") // TODO: Fetch user name
                        .fontWeight(.medium)
                    Text(post.location.name)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                Spacer()
                Text(post.timestamp, style: .relative)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            // Image
            if let imageURL = post.imageURL {
                AsyncImage(url: imageURL) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color(.systemGray5))
                }
                .frame(height: 200)
                .cornerRadius(8)
            }

            // Content
            Text(post.content)
                .fixedSize(horizontal: false, vertical: true)

            // Species and Location
            HStack {
                Label(post.species.name, systemImage: post.species.category == .fish ? "fish" : "hare")
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(.systemGray6))
                    .cornerRadius(12)

                Label("\(post.location.county ?? ""), \(post.location.state)", systemImage: "mappin.circle")
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
            }

            // Actions
            HStack(spacing: 20) {
                Button(action: {}) {
                    Label("\(post.likes)", systemImage: "heart")
                        .foregroundColor(.primary)
                }

                Button(action: {}) {
                    Label("\(post.comments.count)", systemImage: "bubble.right")
                        .foregroundColor(.primary)
                }

                Spacer()

                Button(action: {}) {
                    Image(systemName: "square.and.arrow.up")
                        .foregroundColor(.primary)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct BannerAdView: View {
    var body: some View {
        Text("Banner Ad Space")
            .frame(maxWidth: .infinity)
            .background(Color(.systemGray6))
    }
}

struct SocialFeedView_Previews: PreviewProvider {
    static var previews: some View {
        SocialFeedView()
    }
}
