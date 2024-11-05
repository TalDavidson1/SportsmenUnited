import Foundation
import Combine

class RutTrackerViewModel: ObservableObject {
    @Published var activities: [RutActivity] = []
    @Published var summaries: [RutActivity.Summary] = []
    @Published var isLoading = false
    @Published var error: Error?
    @Published var selectedState: String = ""
    @Published var selectedCounty: String = ""
    @Published var selectedPhase: RutActivity.RutPhase = .preRut
    @Published var selectedActivityLevel: RutActivity.ActivityLevel = .moderate
    @Published var reportDetails: String = ""

    private var cancellables = Set<AnyCancellable>()

    func loadActivities(state: String, county: String? = nil) {
        isLoading = true

        // TODO: Implement Firebase fetch
        // For now, using mock data
        let mockActivity = RutActivity(
            id: UUID().uuidString,
            userId: "user123",
            timestamp: Date(),
            state: "TX",
            county: "Travis",
            phase: .peakRut,
            activityLevel: .heavy,
            details: "Multiple bucks chasing does, heavy scraping activity",
            confirmedBy: []
        )

        let mockSummary = RutActivity.Summary(
            id: UUID().uuidString,
            state: "TX",
            county: "Travis",
            dominantPhase: .peakRut,
            averageActivity: .heavy,
            recentReports: 5,
            lastUpdate: Date()
        )

        activities = [mockActivity]
        summaries = [mockSummary]
        isLoading = false
    }

    func submitReport() {
        guard !selectedState.isEmpty && !selectedCounty.isEmpty else { return }

        isLoading = true

        // TODO: Implement Firebase submission
        let newActivity = RutActivity(
            id: UUID().uuidString,
            userId: "user123", // TODO: Get from auth
            timestamp: Date(),
            state: selectedState,
            county: selectedCounty,
            phase: selectedPhase,
            activityLevel: selectedActivityLevel,
            details: reportDetails,
            confirmedBy: []
        )

        activities.insert(newActivity, at: 0)
        updateSummaries()

        // Reset form
        reportDetails = ""
        isLoading = false
    }

    func confirmActivity(_ activity: RutActivity) {
        // TODO: Implement Firebase update
    }

    private func updateSummaries() {
        // TODO: Implement real summary calculation
        // For now, just using the most recent activity
        if let latest = activities.first {
            let summary = RutActivity.Summary(
                id: UUID().uuidString,
                state: latest.state,
                county: latest.county,
                dominantPhase: latest.phase,
                averageActivity: latest.activityLevel,
                recentReports: activities.count,
                lastUpdate: latest.timestamp
            )

            if let index = summaries.firstIndex(where: { $0.state == latest.state && $0.county == latest.county }) {
                summaries[index] = summary
            } else {
                summaries.append(summary)
            }
        }
    }

    // MARK: - Helper Methods

    func getStates() -> [String] {
        // TODO: Implement real state list
        return ["TX", "OK", "AR", "LA"]
    }

    func getCounties(for state: String) -> [String] {
        // TODO: Implement real county list
        return ["Travis", "Williamson", "Harris", "Dallas"]
    }
}
