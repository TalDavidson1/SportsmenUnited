import SwiftUI

struct ForecastView: View {
    @StateObject private var viewModel = ForecastViewModel()
    @State private var showingDatePicker = false

    // Brand Colors
    private let navyBlue = Color(hex: "1B2B5E")
    private let brandRed = Color(hex: "C41E3A")

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Zip Code Input
                HStack {
                    TextField("Enter Zip Code", text: $viewModel.zipCode)
                        .keyboardType(.numberPad)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .frame(width: 120)

                    Button(action: {
                        showingDatePicker.toggle()
                    }) {
                        Text(viewModel.selectedDate.formatted(date: .abbreviated, time: .omitted))
                            .foregroundColor(navyBlue)
                    }
                    .padding(.horizontal)
                }
                .padding()

                if let forecast = viewModel.forecast {
                    ScrollView {
                        VStack(spacing: 20) {
                            // Moon Phase Card
                            ForecastCard {
                                VStack(spacing: 12) {
                                    Text(forecast.moonPhase.rawValue)
                                        .font(.title2)
                                        .fontWeight(.bold)

                                    HStack(spacing: 20) {
                                        QualityIndicator(
                                            title: "Hunting",
                                            quality: forecast.huntingQuality
                                        )

                                        QualityIndicator(
                                            title: "Fishing",
                                            quality: forecast.fishingQuality
                                        )
                                    }
                                }
                            }

                            // Major Times
                            ForecastCard {
                                VStack(alignment: .leading, spacing: 12) {
                                    Text("Major Activity Times")
                                        .font(.headline)

                                    ForEach(forecast.majorTimes, id: \.start) { timeRange in
                                        TimeRangeView(timeRange: timeRange)
                                    }
                                }
                            }

                            // Minor Times
                            ForecastCard {
                                VStack(alignment: .leading, spacing: 12) {
                                    Text("Minor Activity Times")
                                        .font(.headline)

                                    ForEach(forecast.minorTimes, id: \.start) { timeRange in
                                        TimeRangeView(timeRange: timeRange)
                                    }
                                }
                            }

                            // Sun Times
                            ForecastCard {
                                HStack(spacing: 40) {
                                    VStack {
                                        Image(systemName: "sunrise.fill")
                                            .foregroundColor(.orange)
                                        Text(forecast.sunrise.formatted(date: .omitted, time: .shortened))
                                    }

                                    VStack {
                                        Image(systemName: "sunset.fill")
                                            .foregroundColor(.orange)
                                        Text(forecast.sunset.formatted(date: .omitted, time: .shortened))
                                    }
                                }
                            }
                        }
                        .padding()
                    }
                } else if viewModel.isLoading {
                    ProgressView()
                        .padding()
                } else {
                    Text("Enter your zip code to see the forecast")
                        .foregroundColor(.secondary)
                        .padding()
                }

                // Banner Ad
                BannerAdView()
                    .frame(height: 50)
            }
            .navigationTitle("Forecast")
            .sheet(isPresented: $showingDatePicker) {
                DatePickerView(date: $viewModel.selectedDate)
            }
        }
    }
}

struct ForecastCard<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color(.systemBackground))
            .cornerRadius(12)
            .shadow(color: Color.black.opacity(0.1), radius: 5, y: 2)
    }
}

struct QualityIndicator: View {
    let title: String
    let quality: LunarForecast.ActivityQuality

    var body: some View {
        VStack {
            Text(title)
                .font(.subheadline)
            Text(quality.rawValue)
                .font(.headline)
                .foregroundColor(Color(hex: quality.color))
        }
    }
}

struct TimeRangeView: View {
    let timeRange: LunarForecast.TimeRange

    var body: some View {
        HStack {
            Text("\(timeRange.start.formatted(date: .omitted, time: .shortened)) - \(timeRange.end.formatted(date: .omitted, time: .shortened))")
            Spacer()
            Text(timeRange.quality.rawValue)
                .foregroundColor(Color(hex: timeRange.quality.color))
        }
    }
}

struct DatePickerView: View {
    @Binding var date: Date
    @Environment(\.dismiss) var dismiss

    var body: some View {
        NavigationView {
            DatePicker(
                "Select Date",
                selection: $date,
                displayedComponents: .date
            )
            .datePickerStyle(.graphical)
            .navigationTitle("Select Date")
            .navigationBarItems(trailing: Button("Done") {
                dismiss()
            })
        }
    }
}
