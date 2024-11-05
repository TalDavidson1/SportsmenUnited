import Foundation
import Combine

class ProfileViewModel: ObservableObject {
    @Published var profile: UserProfile?
    @Published var isLoading = false
    @Published var error: Error?
    @Published var isEditMode = false

    // Form fields
    @Published var username = ""
    @Published var email = ""
    @Published var bio = ""
    @Published var preferredSpecies: [UserProfile.Preferences.PreferredSpecies] = []
    @Published var preferredLocations: [UserProfile.Preferences.Location] = []
    @Published var isPrivateProfile = false
    @Published var showLocationInPosts = true
    @Published var allowTagging = true
    @Published var emailNotifications = true
    @Published var pushNotifications = true

    private var cancellables = Set<AnyCancellable>()

    init() {
        loadProfile()
    }

    func loadProfile() {
        isLoading = true

        // TODO: Implement Firebase fetch
        // For now, using mock data
        let mockProfile = UserProfile(
            id: "user123",
            username: "HunterJoe",
            email: "hunter@example.com",
            profileImageURL: nil,
            bio: "Avid hunter and fisherman from Texas",
            preferences: UserProfile.Preferences(
                preferredSpecies: [
                    .init(type: .game, name: "Whitetail Deer"),
                    .init(type: .fish, name: "Bass")
                ],
                preferredLocations: [
                    .init(state: "TX", county: "Travis", zipCodes: ["78701"])
                ],
                notificationSettings: .init(
                    rutUpdates: true,
                    localActivity: true,
                    forecasts: true,
                    mentions: true,
                    comments: true
                )
            ),
            stats: UserProfile.Stats(
                totalPosts: 15,
                totalLikes: 45,
                rutReports: 8,
                speciesCount: ["Whitetail Deer": 3, "Bass": 7]
            ),
            settings: UserProfile.Settings(
                isPrivateProfile: false,
                showLocationInPosts: true,
                allowTagging: true,
                emailNotifications: true,
                pushNotifications: true
            )
        )

        self.profile = mockProfile
        self.populateFormFields()
        self.isLoading = false
    }

    func saveProfile() {
        isLoading = true

        // Create updated profile
        let updatedProfile = UserProfile(
            id: profile?.id ?? "user123",
            username: username,
            email: email,
            profileImageURL: profile?.profileImageURL,
            bio: bio,
            preferences: UserProfile.Preferences(
                preferredSpecies: preferredSpecies,
                preferredLocations: preferredLocations,
                notificationSettings: profile?.preferences.notificationSettings ?? UserProfile.Preferences.NotificationSettings(
                    rutUpdates: true,
                    localActivity: true,
                    forecasts: true,
                    mentions: true,
                    comments: true
                )
            ),
            stats: profile?.stats ?? UserProfile.Stats(
                totalPosts: 0,
                totalLikes: 0,
                rutReports: 0,
                speciesCount: [:]
            ),
            settings: UserProfile.Settings(
                isPrivateProfile: isPrivateProfile,
                showLocationInPosts: showLocationInPosts,
                allowTagging: allowTagging,
                emailNotifications: emailNotifications,
                pushNotifications: pushNotifications
            )
        )

        // TODO: Implement Firebase update
        self.profile = updatedProfile
        self.isLoading = false
        self.isEditMode = false
    }

    private func populateFormFields() {
        guard let profile = profile else { return }

        username = profile.username
        email = profile.email
        bio = profile.bio ?? ""
        preferredSpecies = profile.preferences.preferredSpecies
        preferredLocations = profile.preferences.preferredLocations
        isPrivateProfile = profile.settings.isPrivateProfile
        showLocationInPosts = profile.settings.showLocationInPosts
        allowTagging = profile.settings.allowTagging
        emailNotifications = profile.settings.emailNotifications
        pushNotifications = profile.settings.pushNotifications
    }

    func addPreferredSpecies(type: UserProfile.Preferences.PreferredSpecies.SpeciesType, name: String) {
        let species = UserProfile.Preferences.PreferredSpecies(type: type, name: name)
        preferredSpecies.append(species)
    }

    func removePreferredSpecies(at index: Int) {
        preferredSpecies.remove(at: index)
    }

    func addPreferredLocation(state: String, county: String?, zipCodes: [String]) {
        let location = UserProfile.Preferences.Location(state: state, county: county, zipCodes: zipCodes)
        preferredLocations.append(location)
    }

    func removePreferredLocation(at index: Int) {
        preferredLocations.remove(at: index)
    }
}
