import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';

const ForecastScreen = () => {
  const theme = useTheme();
  const [zipCode, setZipCode] = React.useState('');
  const [forecast, setForecast] = React.useState([
    {
      date: '2024-02-20',
      lunarPhase: 'Full Moon',
      bestTimes: ['6:00 AM - 9:00 AM', '5:00 PM - 8:00 PM'],
      activityRating: 'High',
      moonrise: '6:45 PM',
      moonset: '7:15 AM'
    }
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 16 }}>
        <TextInput
          label="Enter Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          mode="outlined"
          style={{ marginBottom: 16 }}
          keyboardType="numeric"
        />
        <Button
          mode="contained"
          onPress={() => console.log('Get forecast')}
          style={{ backgroundColor: theme.colors.primary }}
        >
          Get 7-Day Forecast
        </Button>

        {forecast.map((day, index) => (
          <Card key={index} style={{ marginTop: 16 }}>
            <Card.Content>
              <Title>Hunting & Fishing Forecast</Title>
              <Paragraph style={{ marginTop: 8 }}>🌙 Lunar Phase: {day.lunarPhase}</Paragraph>
              <Paragraph>⏰ Best Times:</Paragraph>
              {day.bestTimes.map((time, i) => (
                <Paragraph key={i} style={{ marginLeft: 16 }}>• {time}</Paragraph>
              ))}
              <Paragraph>📈 Activity Rating: {day.activityRating}</Paragraph>
              <Paragraph>🌅 Moonrise: {day.moonrise}</Paragraph>
              <Paragraph>🌄 Moonset: {day.moonset}</Paragraph>
            </Card.Content>
          </Card>
        ))}

        {/* Ad Space */}
        <View style={{ height: 50, backgroundColor: '#eee', marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph>Ad Space</Paragraph>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForecastScreen;
