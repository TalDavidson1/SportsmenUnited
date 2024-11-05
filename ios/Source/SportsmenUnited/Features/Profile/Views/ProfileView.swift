import SwiftUI

struct ProfileView: View {
    @StateObject private var viewModel = ProfileViewModel()
    @State private var showingImagePicker = false

    // Brand Colors
    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                ScrollView {
                    VStack(spacing: 20) {
                        // Profile Header
                        ProfileHeaderView(viewModel: viewModel)
                            .padding(.top)

                        // Stats View
                        if let stats = viewModel.profile?.stats {
                            StatsView(stats: stats)
                        }

                        // Main Content
                        if viewModel.isEditMode {
                            ProfileEditView(viewModel: viewModel)
                        } else {
                            ProfileDetailsView(viewModel: viewModel)
                        }
                    }
                    .padding()
                }

                // Banner Ad
                BannerAdView()
                    .frame(height: 50)
            }
            .navigationTitle("Profile")
            .navigationBarItems(trailing: Button(action: {
                if viewModel.isEditMode {
                    viewModel.saveProfile()
                } else {
                    viewModel.isEditMode = true
                }
            }) {
                Text(viewModel.isEditMode ? "Save" : "Edit")
                    .foregroundColor(navyBlue)
            })
        }
    }
}

struct ProfileHeaderView: View {
    @ObservedObject var viewModel: ProfileViewModel

    var body: some View {
        VStack(spacing: 12) {
            // Profile Image
            ZStack {
                Circle()
                    .fill(Color(.systemGray5))
                    .frame(width: 100, height: 100)

                if viewModel.profile?.profileImageURL != nil {
                    // TODO: Implement image loading
                    Circle()
                        .fill(Color(.systemGray3))
                        .frame(width: 100, height: 100)
                } else {
                    Image(systemName: "person.circle.fill")
                        .resizable()
                        .foregroundColor(.gray)
                        .frame(width: 100, height: 100)
                }
            }

            Text(viewModel.profile?.username ?? "Username")
                .font(.title2)
                .fontWeight(.bold)

            if let bio = viewModel.profile?.bio {
                Text(bio)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
    }
}

struct StatsView: View {
    let stats: UserProfile.Stats

    var body: some View {
        HStack(spacing: 40) {
            StatItem(title: "Posts", value: "\(stats.totalPosts)")
            StatItem(title: "Likes", value: "\(stats.totalLikes)")
            StatItem(title: "Rut Reports", value: "\(stats.rutReports)")
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct StatItem: View {
    let title: String
    let value: String

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.headline)
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

struct ProfileDetailsView: View {
    @ObservedObject var viewModel: ProfileViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Preferred Species
            Section(header: SectionHeader(title: "Preferred Species")) {
                ForEach(viewModel.preferredSpecies, id: \.id) { species in
                    HStack {
                        Image(systemName: species.type == .fish ? "fish" : "pawprint")
                        Text(species.name)
                    }
                }
            }

            // Preferred Locations
            Section(header: SectionHeader(title: "Preferred Locations")) {
                ForEach(viewModel.preferredLocations, id: \.id) { location in
                    Text("\(location.county ?? ""), \(location.state)")
                }
            }

            // Settings
            Section(header: SectionHeader(title: "Settings")) {
                SettingRow(title: "Private Profile", isEnabled: viewModel.profile?.settings.isPrivateProfile ?? false)
                SettingRow(title: "Show Location", isEnabled: viewModel.profile?.settings.showLocationInPosts ?? true)
                SettingRow(title: "Allow Tagging", isEnabled: viewModel.profile?.settings.allowTagging ?? true)
                SettingRow(title: "Email Notifications", isEnabled: viewModel.profile?.settings.emailNotifications ?? true)
                SettingRow(title: "Push Notifications", isEnabled: viewModel.profile?.settings.pushNotifications ?? true)
            }
        }
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct ProfileEditView: View {
    @ObservedObject var viewModel: ProfileViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Basic Info
            Section(header: SectionHeader(title: "Basic Information")) {
                TextField("Username", text: $viewModel.username)
                    .textFieldStyle(RoundedBorderTextFieldStyle())

                TextField("Email", text: $viewModel.email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())

                TextField("Bio", text: $viewModel.bio)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }

            // Settings
            Section(header: SectionHeader(title: "Settings")) {
                Toggle("Private Profile", isOn: $viewModel.isPrivateProfile)
                Toggle("Show Location", isOn: $viewModel.showLocationInPosts)
                Toggle("Allow Tagging", isOn: $viewModel.allowTagging)
                Toggle("Email Notifications", isOn: $viewModel.emailNotifications)
                Toggle("Push Notifications", isOn: $viewModel.pushNotifications)
            }

            // Species Selection
            Section(header: SectionHeader(title: "Preferred Species")) {
                Button(action: {
                    viewModel.addPreferredSpecies(type: .game, name: "Whitetail Deer")
                }) {
                    Label("Add Species", systemImage: "plus.circle")
                }
            }

            // Location Selection
            Section(header: SectionHeader(title: "Preferred Locations")) {
                Button(action: {
                    viewModel.addPreferredLocation(state: "TX", county: "Travis", zipCodes: ["78701"])
                }) {
                    Label("Add Location", systemImage: "plus.circle")
                }
            }
        }
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct SectionHeader: View {
    let title: String

    var body: some View {
        Text(title)
            .font(.headline)
            .foregroundColor(.secondary)
            .padding(.vertical, 8)
    }
}

struct SettingRow: View {
    let title: String
    let isEnabled: Bool

    var body: some View {
        HStack {
            Text(title)
            Spacer()
            Image(systemName: isEnabled ? "checkmark.circle.fill" : "circle")
                .foregroundColor(isEnabled ? .green : .gray)
        }
    }
}
