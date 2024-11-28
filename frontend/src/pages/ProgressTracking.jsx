import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import HealthMetricsCharts from "../components/HealthMetricsCharts";  
import Navbar from '../components/Navbar';
import React, { useState } from 'react';

const HealthCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [healthData, setHealthData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    weight: '',
    bloodSugar: '',
    bloodPressure: '',
    cholesterol: ''
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasData = healthData[dateString];

      days.push(
        <div
          key={day}
          className={`h-32 border p-4 cursor-pointer relative transition-all duration-200 ease-in-out ${
            hasData ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedDate(dateString);
            setIsDialogOpen(true);
          }}
        >
          <div className="flex justify-between">
            <span className="font-medium text-lg">{day}</span>
            {hasData && (
              <div className="flex gap-1">
                {hasData.weight && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                {hasData.bloodSugar && <div className="w-2 h-2 rounded-full bg-red-500" />}
                {hasData.bloodPressure && <div className="w-2 h-2 rounded-full bg-green-500" />}
                {hasData.cholesterol && <div className="w-2 h-2 rounded-full bg-purple-500" />}
              </div>
            )}
          </div>
          {hasData && (
            <div className="mt-1 text-xs text-gray-600">
              {hasData.weight && <div>Weight: {hasData.weight} lbs</div>}
              {hasData.bloodSugar && <div>Blood Sugar: {hasData.bloodSugar}</div>}
              {hasData.bloodPressure && <div>BP: {hasData.bloodPressure}</div>}
              {hasData.cholesterol && <div>Chol: {hasData.cholesterol}</div>}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '') {
        newData[key] = value;
      }
    });

    setHealthData(prev => ({
      ...prev,
      [selectedDate]: newData
    }));

    setFormData({
      weight: '',
      bloodSugar: '',
      bloodPressure: '',
      cholesterol: ''
    });
    setIsDialogOpen(false);
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div> 
      <Navbar /> 
      <div className="text-2xl text-white font-semibold p-5 mt-28 text-center">
        <h1>Track Your Health Progress</h1>

        <p className="text-sm text-gray-400 mt-2">Log your daily health metrics to monitor changes over time and see if your diet and lifestyle are improving!</p>
      </div>
 
      <Card className="max-w-6xl mx-auto mt-10 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ←
                </button>
                <h2 className="text-2xl font-semibold">{monthName} {year}</h2>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> Weight
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" /> Blood Sugar
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Blood Pressure
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500" /> Cholesterol
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center font-medium bg-gray-200 text-gray-800 rounded-tl-lg rounded-tr-lg">
                {day}
              </div>
            ))}
            {generateCalendarDays()}
          </div>
          </CardContent>
          </Card>
          <div className="text-2xl text-white font-semibold p-5 mt-28 text-center">
        <h1>Your Weekly Progress</h1>
        <p className="text-sm text-gray-400 mt-2">Visual Representation of Your Progress</p>

      </div>

          <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md max-w-6xl mx-auto">
         
            <HealthMetricsCharts healthData={healthData} />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-gray-800 p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-white text-lg">Add Health Metrics for {selectedDate}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Weight (lbs)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={formData.bloodSugar}
                    onChange={(e) => setFormData(prev => ({ ...prev, bloodSugar: e.target.value }))}
                    className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Blood Pressure (mmHg)</label>
                  <input
                    type="text"
                    value={formData.bloodPressure}
                    onChange={(e) => setFormData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                    className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Cholesterol (mg/dL)</label>
                  <input
                    type="number"
                    value={formData.cholesterol}
                    onChange={(e) => setFormData(prev => ({ ...prev, cholesterol: e.target.value }))}
                    className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
       
    </div>
  );
};

export default HealthCalendar;
