import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthMetricsCharts = ({ healthData }) => {
  // Memoize the chart data transformation
  const chartData = useMemo(() => {
    return Object.entries(healthData).map(([date, metrics]) => ({
      date,
      weight: metrics.weight ? parseFloat(metrics.weight) : null,
      bloodSugar: metrics.bloodSugar ? parseFloat(metrics.bloodSugar) : null,
      bloodPressureSystolic: metrics.bloodPressure ? parseInt(metrics.bloodPressure.split('/')[0]) : null,
      bloodPressureDiastolic: metrics.bloodPressure ? parseInt(metrics.bloodPressure.split('/')[1]) : null,
      cholesterol: metrics.cholesterol ? parseFloat(metrics.cholesterol) : null,
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [healthData]);

  if (chartData.length === 0) return null;

  // Common render chart function
  const renderChart = (title, dataKey, color, unit) => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{ value: unit, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [`${value} ${unit}`, title]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  // Specialized render for Blood Pressure (with two lines)
  const renderBloodPressureChart = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Blood Pressure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{ value: 'mmHg', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value, name) => [
                  `${value} mmHg`,
                  name === 'bloodPressureSystolic' ? 'Systolic' : 'Diastolic',
                ]}
              />
              <Legend
                payload={[
                  { value: 'Systolic', type: 'line', color: '#ef4444' },
                  { value: 'Diastolic', type: 'line', color: '#3b82f6' },
                ]}
              />
              <Line
                type="monotone"
                dataKey="bloodPressureSystolic"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                connectNulls
                name="Systolic"
              />
              <Line
                type="monotone"
                dataKey="bloodPressureDiastolic"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                connectNulls
                name="Diastolic"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="mt-20">
  <div className="mb-6">
    {renderChart('Weight', 'weight', '#22c55e', 'lbs')}
  </div>
  <div className="mb-6">
    {renderChart('Blood Sugar', 'bloodSugar', '#f97316', 'mg/dL')}
  </div>
  <div className="mb-6">
    {renderBloodPressureChart()}
  </div>
  <div className="mb-6">
    {renderChart('Cholesterol', 'cholesterol', '#8b5cf6', 'mg/dL')}
  </div>
</div>

  );
};

export default HealthMetricsCharts;
