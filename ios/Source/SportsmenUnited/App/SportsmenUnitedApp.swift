import SwiftUI
import Firebase

@main
struct SportsmenUnitedApp: App {
    @StateObject private var appState = AppState()

    init() {
        FirebaseApp.configure()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
    }
}

class AppState: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var selectedTab: Tab = .home

    enum Tab {
        case home
        case forecast
        case post
        case map
        case profile
    }
}

struct User {
    let id: String
    var username: String
    var profileImageURL: URL?
    var location: String?
    var preferences: UserPreferences
}

struct UserPreferences {
    var species: [String]
    var locations: [String]
    var notificationSettings: NotificationSettings
}

struct NotificationSettings {
    var rutUpdates: Bool
    var localActivity: Bool
    var forecasts: Bool
}
