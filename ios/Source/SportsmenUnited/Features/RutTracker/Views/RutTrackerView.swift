import SwiftUI

struct RutTrackerView: View {
    @StateObject private var viewModel = RutTrackerViewModel()
    @State private var showingReportSheet = false

    // Brand Colors
    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // State and County Selection
                HStack {
                    Picker("State", selection: $viewModel.selectedState) {
                        Text("Select State").tag("")
                        ForEach(viewModel.getStates(), id: \.self) { state in
                            Text(state).tag(state)
                        }
                    }
                    .frame(width: 120)

                    Picker("County", selection: $viewModel.selectedCounty) {
                        Text("Select County").tag("")
                        ForEach(viewModel.getCounties(for: viewModel.selectedState), id: \.self) { county in
                            Text(county).tag(county)
                        }
                    }
                }
                .padding()

                // Activity Summary
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(viewModel.summaries) { summary in
                            RutSummaryCard(summary: summary)
                        }

                        ForEach(viewModel.activities) { activity in
                            RutActivityCard(activity: activity)
                        }
                    }
                    .padding()
                }

                // Banner Ad
                BannerAdView()
                    .frame(height: 50)
            }
            .navigationTitle("Rut Tracker")
            .navigationBarItems(trailing: Button(action: {
                showingReportSheet = true
            }) {
                Image(systemName: "plus.circle.fill")
                    .foregroundColor(navyBlue)
                    .imageScale(.large)
            })
        }
        .sheet(isPresented: $showingReportSheet) {
            RutReportView(viewModel: viewModel)
        }
    }
}

struct RutSummaryCard: View {
    let summary: RutActivity.Summary

    private let navyBlue = Color(hex: "1B2B5E")

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("\(summary.county), \(summary.state)")
                    .font(.headline)
                Spacer()
                Text("\(summary.recentReports) reports")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            HStack {
                VStack(alignment: .leading) {
                    Text("Dominant Phase")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(summary.dominantPhase.rawValue)
                        .foregroundColor(Color(hex: summary.dominantPhase.color))
                }

                Spacer()

                VStack(alignment: .trailing) {
                    Text("Activity Level")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(summary.averageActivity.description)
                        .foregroundColor(Color(hex: summary.averageActivity.color))
                }
            }

            Text("Last updated: \(summary.lastUpdate.formatted())")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct RutActivityCard: View {
    let activity: RutActivity

    private let navyBlue = Color(hex: "1B2B5E")

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("\(activity.county), \(activity.state)")
                    .font(.subheadline)
                Spacer()
                Text(activity.timestamp.formatted(date: .abbreviated, time: .shortened))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            HStack {
                Label {
                    Text(activity.phase.rawValue)
                        .foregroundColor(Color(hex: activity.phase.color))
                } icon: {
                    Image(systemName: "deer")
                }

                Spacer()

                Label {
                    Text(activity.activityLevel.description)
                        .foregroundColor(Color(hex: activity.activityLevel.color))
                } icon: {
                    Image(systemName: "chart.bar.fill")
                }
            }

            if let details = activity.details {
                Text(details)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            HStack {
                Text("\(activity.confirmedBy.count) confirmations")
                    .font(.caption)
                    .foregroundColor(.secondary)


                Spacer()

                Button(action: {}) {
                    Label("Confirm", systemImage: "checkmark.circle")
                        .font(.caption)
                        .foregroundColor(navyBlue)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct RutReportView: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: RutTrackerViewModel

    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Location")) {
                    Picker("State", selection: $viewModel.selectedState) {
                        Text("Select State").tag("")
                        ForEach(viewModel.getStates(), id: \.self) { state in
                            Text(state).tag(state)
                        }
                    }

                    Picker("County", selection: $viewModel.selectedCounty) {
                        Text("Select County").tag("")
                        ForEach(viewModel.getCounties(for: viewModel.selectedState), id: \.self) { county in
                            Text(county).tag(county)
                        }
                    }
                }

                Section(header: Text("Rut Status")) {
                    Picker("Phase", selection: $viewModel.selectedPhase) {
                        ForEach(RutActivity.RutPhase.allCases, id: \.self) { phase in
                            Text(phase.rawValue)
                                .tag(phase)
                        }
                    }

                    Picker("Activity Level", selection: $viewModel.selectedActivityLevel) {
                        ForEach(RutActivity.ActivityLevel.allCases, id: \.self) { level in
                            Text(level.description)
                                .tag(level)
                        }
                    }
                }

                Section(header: Text("Details")) {
                    TextEditor(text: $viewModel.reportDetails)
                        .frame(height: 100)
                }
            }
            .navigationTitle("Report Rut Activity")
            .navigationBarItems(
                leading: Button("Cancel") {
                    dismiss()
                },
                trailing: Button("Submit") {
                    viewModel.submitReport()
                    dismiss()
                }
                .disabled(viewModel.selectedState.isEmpty || viewModel.selectedCounty.isEmpty)
            )
        }
    }
}
