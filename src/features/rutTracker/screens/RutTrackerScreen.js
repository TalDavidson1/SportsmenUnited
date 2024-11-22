import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, SegmentedButtons, Card, Title, Paragraph, useTheme } from 'react-native-paper';

const RutTrackerScreen = () => {
  const theme = useTheme();
  const [county, setCounty] = React.useState('');
  const [state, setState] = React.useState('');
  const [rutPhase, setRutPhase] = React.useState('pre');
  const [activityLevel, setActivityLevel] = React.useState('low');

  const [recentReports, setRecentReports] = React.useState([
    { county: 'Bedford', state: 'VA', phase: 'Peak Rut', activity: 'High', date: '2024-02-20' }
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Title>Report Rut Activity</Title>
            <TextInput
              label="County"
              value={county}
              onChangeText={setCounty}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />
            <TextInput
              label="State"
              value={state}
              onChangeText={setState}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />

            <Title style={{ marginBottom: 8 }}>Rut Phase</Title>
            <SegmentedButtons
              value={rutPhase}
              onValueChange={setRutPhase}
              buttons={[
                { value: 'pre', label: 'Pre-Rut' },
                { value: 'peak', label: 'Peak Rut' },
                { value: 'post', label: 'Post-Rut' },
              ]}
              style={{ marginBottom: 16 }}
            />

            <Title style={{ marginBottom: 8 }}>Activity Level</Title>
            <SegmentedButtons
              value={activityLevel}
              onValueChange={setActivityLevel}
              buttons={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              style={{ marginBottom: 16 }}
            />

            <Button
              mode="contained"
              onPress={() => console.log('Submit rut report')}
              style={{ backgroundColor: theme.colors.primary }}
            >
              Submit Report
            </Button>
          </Card.Content>
        </Card>

        <Title>Recent Reports</Title>
        {recentReports.map((report, index) => (
          <Card key={index} style={{ marginTop: 8 }}>
            <Card.Content>
              <Paragraph>📍 {report.county}, {report.state}</Paragraph>
              <Paragraph>🦌 Phase: {report.phase}</Paragraph>
              <Paragraph>📈 Activity: {report.activity}</Paragraph>
              <Paragraph>📅 {report.date}</Paragraph>
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

export default RutTrackerScreen;
