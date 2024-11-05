import Foundation
import Combine

class ForecastViewModel: ObservableObject {
    @Published var forecast: LunarForecast?
    @Published var isLoading = false
    @Published var error: Error?
    @Published var zipCode: String = ""
    @Published var selectedDate: Date = Date()

    private var cancellables = Set<AnyCancellable>()

    func loadForecast(for zipCode: String) {
        isLoading = true

        // TODO: Implement actual API call
        // For now, using mock data
        let calendar = Calendar.current
        let now = Date()

        let sunrise = calendar.date(bySettingHour: 6, minute: 30, second: 0, of: now) ?? now
        let sunset = calendar.date(bySettingHour: 19, minute: 45, second: 0, of: now) ?? now

        let majorStart1 = calendar.date(bySettingHour: 10, minute: 0, second: 0, of: now) ?? now
        let majorEnd1 = calendar.date(byAdding: .hour, value: 2, to: majorStart1) ?? now

        let majorStart2 = calendar.date(bySettingHour: 22, minute: 0, second: 0, of: now) ?? now
        let majorEnd2 = calendar.date(byAdding: .hour, value: 2, to: majorStart2) ?? now

        let minorStart1 = calendar.date(bySettingHour: 4, minute: 0, second: 0, of: now) ?? now
        let minorEnd1 = calendar.date(byAdding: .hour, value: 1, to: minorStart1) ?? now

        let minorStart2 = calendar.date(bySettingHour: 16, minute: 0, second: 0, of: now) ?? now
        let minorEnd2 = calendar.date(byAdding: .hour, value: 1, to: minorStart2) ?? now

        let mockForecast = LunarForecast(
            id: UUID().uuidString,
            date: now,
            moonPhase: .fullMoon,
            huntingQuality: .excellent,
            fishingQuality: .good,
            majorTimes: [
                LunarForecast.TimeRange(start: majorStart1, end: majorEnd1, quality: .excellent),
                LunarForecast.TimeRange(start: majorStart2, end: majorEnd2, quality: .excellent)
            ],
            minorTimes: [
                LunarForecast.TimeRange(start: minorStart1, end: minorEnd1, quality: .good),
                LunarForecast.TimeRange(start: minorStart2, end: minorEnd2, quality: .good)
            ],
            zipCode: zipCode,
            sunrise: sunrise,
            sunset: sunset
        )

        self.forecast = mockForecast
        self.isLoading = false
    }

    func updateZipCode(_ newZipCode: String) {
        zipCode = newZipCode
        if zipCode.count == 5 {
            loadForecast(for: zipCode)
        }
    }

    func updateDate(_ newDate: Date) {
        selectedDate = newDate
        if !zipCode.isEmpty {
            loadForecast(for: zipCode)
        }
    }
}
