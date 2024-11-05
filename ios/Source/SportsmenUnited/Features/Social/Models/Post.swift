import Foundation
import CoreLocation

struct Post: Identifiable, Codable {
    let id: String
    let userId: String
    let timestamp: Date
    var content: String
    var imageURL: URL?
    var location: Location
    var species: Species
    var likes: Int
    var comments: [Comment]

    struct Location: Codable {
        var coordinates: CLLocationCoordinate2D
        var name: String
        var county: String?
        var state: String

        enum CodingKeys: String, CodingKey {
            case latitude, longitude, name, county, state
        }

        func encode(to encoder: Encoder) throws {
            var container = encoder.container(keyedBy: CodingKeys.self)
            try container.encode(coordinates.latitude, forKey: .latitude)
            try container.encode(coordinates.longitude, forKey: .longitude)
            try container.encode(name, forKey: .name)
            try container.encode(county, forKey: .county)
            try container.encode(state, forKey: .state)
        }

        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            let latitude = try container.decode(Double.self, forKey: .latitude)
            let longitude = try container.decode(Double.self, forKey: .longitude)
            coordinates = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
            name = try container.decode(String.self, forKey: .name)
            county = try container.decodeIfPresent(String.self, forKey: .county)
            state = try container.decode(String.self, forKey: .state)
        }

        init(coordinates: CLLocationCoordinate2D, name: String, county: String? = nil, state: String) {
            self.coordinates = coordinates
            self.name = name
            self.county = county
            self.state = state
        }
    }

    struct Species: Codable {
        enum Category: String, Codable {
            case fish
            case game
        }

        var category: Category
        var name: String
        var details: String?
    }
}

struct Comment: Identifiable, Codable {
    let id: String
    let userId: String
    let content: String
    let timestamp: Date
}
