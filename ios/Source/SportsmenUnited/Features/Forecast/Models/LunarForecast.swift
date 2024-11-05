import Foundation

struct LunarForecast: Identifiable, Codable {
    let id: String
    let date: Date
    let moonPhase: MoonPhase
    let huntingQuality: ActivityQuality
    let fishingQuality: ActivityQuality
    let majorTimes: [TimeRange]
    let minorTimes: [TimeRange]
    let zipCode: String
    let sunrise: Date
    let sunset: Date

    enum MoonPhase: String, Codable {
        case newMoon = "New Moon"
        case waxingCrescent = "Waxing Crescent"
        case firstQuarter = "First Quarter"
        case waxingGibbous = "Waxing Gibbous"
        case fullMoon = "Full Moon"
        case waningGibbous = "Waning Gibbous"
        case lastQuarter = "Last Quarter"
        case waningCrescent = "Waning Crescent"

        var activityMultiplier: Double {
            switch self {
            case .fullMoon, .newMoon:
                return 1.0
            case .firstQuarter, .lastQuarter:
                return 0.75
            case .waxingGibbous, .waningGibbous:
                return 0.85
            case .waxingCrescent, .waningCrescent:
                return 0.65
            }
        }
    }

    enum ActivityQuality: String, Codable {
        case excellent = "Excellent"
        case good = "Good"
        case fair = "Fair"
        case poor = "Poor"

        var score: Int {
            switch self {
            case .excellent: return 4
            case .good: return 3
            case .fair: return 2
            case .poor: return 1
            }
        }

        var color: String {
            switch self {
            case .excellent: return "4CAF50" // Green
            case .good: return "8BC34A" // Light Green
            case .fair: return "FFC107" // Amber
            case .poor: return "FF5722" // Deep Orange
            }
        }
    }

    struct TimeRange: Codable {
        let start: Date
        let end: Date
        let quality: ActivityQuality
    }

    static func calculateQuality(moonPhase: MoonPhase, solunarActivity: Double, weather: WeatherCondition) -> ActivityQuality {
        let baseScore = moonPhase.activityMultiplier * solunarActivity
        let weatherImpact = weather.activityImpact

        let finalScore = baseScore * weatherImpact

        switch finalScore {
        case 0.8...1.0: return .excellent
        case 0.6..<0.8: return .good
        case 0.4..<0.6: return .fair
        default: return .poor
        }
    }
}

struct WeatherCondition: Codable {
    let temperature: Double
    let windSpeed: Double
    let precipitation: Double
    let pressure: Double
    let cloudCover: Double

    var activityImpact: Double {
        // Calculate weather impact on activity (0.0 to 1.0)
        var impact = 1.0

        // Temperature impact (ideal range 40-75°F)
        if temperature < 40 || temperature > 75 {
            impact *= 0.8
        }

        // Wind impact (over 15mph reduces activity)
        if windSpeed > 15 {
            impact *= 0.7
        }

        // Precipitation impact
        if precipitation > 0 {
            impact *= 0.6
        }

        // Pressure changes impact (stable is better)
        if pressure < 29.8 || pressure > 30.2 {
            impact *= 0.9
        }

        // Cloud cover impact (partly cloudy is often best)
        if cloudCover > 80 {
            impact *= 0.9
        }

        return impact
    }
}
