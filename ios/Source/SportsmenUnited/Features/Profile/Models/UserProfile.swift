import Foundation

struct UserProfile: Identifiable, Codable {
    let id: String
    var username: String
    var email: String
    var profileImageURL: URL?
    var bio: String?
    var preferences: Preferences
    var stats: Stats
    var settings: Settings

    struct Preferences: Codable {
        var preferredSpecies: [PreferredSpecies]
        var preferredLocations: [Location]
        var notificationSettings: NotificationSettings

        struct PreferredSpecies: Codable, Identifiable {
            var id: String { type.rawValue + name }
            var type: SpeciesType
            var name: String

            enum SpeciesType: String, Codable {
                case fish
                case game
            }
        }

        struct Location: Codable, Identifiable {
            var id: String { "\(state)-\(county ?? "")" }
            var state: String
            var county: String?
            var zipCodes: [String]
        }

        struct NotificationSettings: Codable {
            var rutUpdates: Bool
            var localActivity: Bool
            var forecasts: Bool
            var mentions: Bool
            var comments: Bool
        }
    }

    struct Stats: Codable {
        var totalPosts: Int
        var totalLikes: Int
        var rutReports: Int
        var speciesCount: [String: Int] // Species name to count mapping
    }

    struct Settings: Codable {
        var isPrivateProfile: Bool
        var showLocationInPosts: Bool
        var allowTagging: Bool
        var emailNotifications: Bool
        var pushNotifications: Bool
    }
}
