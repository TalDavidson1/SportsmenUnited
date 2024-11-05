import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState

    // Brand Colors
    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        Group {
            if appState.isAuthenticated {
                TabView(selection: $appState.selectedTab) {
                    SocialFeedView()
                        .tabItem {
                            Label("Home", systemImage: "house.fill")
                        }
                        .tag(AppState.Tab.home)

                    ForecastView()
                        .tabItem {
                            Label("Forecast", systemImage: "moon.stars.fill")
                        }
                        .tag(AppState.Tab.forecast)

                    PostCreationView()
                        .tabItem {
                            Label("Post", systemImage: "plus.circle.fill")
                        }
                        .tag(AppState.Tab.post)

                    MapView()
                        .tabItem {
                            Label("Map", systemImage: "map.fill")
                        }
                        .tag(AppState.Tab.map)

                    ProfileView()
                        .tabItem {
                            Label("Profile", systemImage: "person.fill")
                        }
                        .tag(AppState.Tab.profile)
                }
                .accentColor(navyBlue)
            } else {
                AuthenticationView()
            }
        }
    }
}

// Color Extension for Hex Support
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// Placeholder Views
struct SocialFeedView: View {
    var body: some View {
        Text("Social Feed")
    }
}

struct ForecastView: View {
    var body: some View {
        Text("Forecast")
    }
}

struct PostCreationView: View {
    var body: some View {
        Text("Create Post")
    }
}

struct MapView: View {
    var body: some View {
        Text("Map")
    }
}

struct ProfileView: View {
    var body: some View {
        Text("Profile")
    }
}

struct AuthenticationView: View {
    var body: some View {
        Text("Authentication")
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(AppState())
    }
}
