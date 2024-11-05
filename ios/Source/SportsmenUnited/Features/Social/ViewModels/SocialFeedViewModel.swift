import Foundation
import Combine
import CoreLocation

class SocialFeedViewModel: ObservableObject {
    @Published var posts: [Post] = []
    @Published var isLoading = false
    @Published var error: Error?
    @Published var selectedFilter: FilterType = .all

    private var cancellables = Set<AnyCancellable>()
    private let locationManager = CLLocationManager()

    enum FilterType {
        case all
        case nearby
        case fish
        case game
    }

    init() {
        setupLocationManager()
        loadPosts()
    }

    private func setupLocationManager() {
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestWhenInUseAuthorization()
    }

    func loadPosts() {
        isLoading = true
        // TODO: Implement Firebase fetch
        // For now, using mock data
        let mockPost = Post(
            id: UUID().uuidString,
            userId: "user123",
            timestamp: Date(),
            content: "Great day fishing!",
            imageURL: nil,
            location: Post.Location(
                coordinates: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
                name: "San Francisco Bay",
                county: "San Francisco",
                state: "CA"
            ),
            species: Post.Species(
                category: .fish,
                name: "Bass",
                details: "5 lbs"
            ),
            likes: 0,
            comments: []
        )
        posts = [mockPost]
        isLoading = false
    }

    func filterPosts(by type: FilterType) {
        selectedFilter = type
        loadPosts() // Will implement filtering logic
    }

    func likePost(_ post: Post) {
        // TODO: Implement Firebase update
    }

    func addComment(to post: Post, content: String) {
        // TODO: Implement Firebase update
    }
}
