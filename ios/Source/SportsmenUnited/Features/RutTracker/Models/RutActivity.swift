import Foundation

struct RutActivity: Identifiable, Codable {
    let id: String
    let userId: String
    let timestamp: Date
    let state: String
    let county: String
    let phase: RutPhase
    let activityLevel: ActivityLevel
    let details: String?
    var confirmedBy: [String] // User IDs who confirmed this report

    enum RutPhase: String, Codable, CaseIterable {
        case preRut = "Pre-Rut"
        case earlyRut = "Early Rut"
        case peakRut = "Peak Rut"
        case lateRut = "Late Rut"
        case postRut = "Post-Rut"

        var description: String {
            switch self {
            case .preRut:
                return "Bucks establishing territories, light scraping"
            case .earlyRut:
                return "Increasing buck movement, more scrapes appearing"
            case .peakRut:
                return "Maximum deer activity, frequent chasing"
            case .lateRut:
                return "Decreasing activity, some does still unbred"
            case .postRut:
                return "Minimal rutting activity, focus on feeding"
            }
        }

        var color: String {
            switch self {
            case .preRut: return "FFC107" // Amber
            case .earlyRut: return "FF9800" // Orange
            case .peakRut: return "F44336" // Red
            case .lateRut: return "9C27B0" // Purple
            case .postRut: return "3F51B5" // Indigo
            }
        }
    }

    enum ActivityLevel: Int, Codable, CaseIterable {
        case minimal = 1
        case light = 2
        case moderate = 3
        case heavy = 4
        case intense = 5

        var description: String {
            switch self {
            case .minimal: return "Minimal Activity"
            case .light: return "Light Activity"
            case .moderate: return "Moderate Activity"
            case .heavy: return "Heavy Activity"
            case .intense: return "Intense Activity"
            }
        }

        var color: String {
            switch self {
            case .minimal: return "9E9E9E" // Gray
            case .light: return "8BC34A" // Light Green
            case .moderate: return "FFC107" // Amber
            case .heavy: return "FF5722" // Deep Orange
            case .intense: return "F44336" // Red
            }
        }
    }

    struct Summary: Identifiable {
        let id: String
        let state: String
        let county: String
        let dominantPhase: RutPhase
        let averageActivity: ActivityLevel
        let recentReports: Int
        let lastUpdate: Date
    }
}
