import React, { useState } from 'react';
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

  // Get calendar data
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasData = healthData[dateString];
      
      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 relative ${
            hasData ? 'bg-blue-50' : ''
          }`}
          onClick={() => {
            setSelectedDate(dateString);
            setIsDialogOpen(true);
          }}
        >
          <div className="flex justify-between">
            <span className="font-medium">{day}</span>
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
            <div className="mt-1 text-xs">
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

  // Handle form submission
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

  // Handle month navigation
  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <Card className="max-w-6xl mx-auto mt-16">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <h2 className="text-xl font-bold">
                {monthName} {year}
              </h2>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
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
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium bg-gray-50">
              {day}
            </div>
          ))}
          {generateCalendarDays()}
        </div>

         <HealthMetricsCharts healthData={healthData} />


        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add Health Metrics for {selectedDate}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Weight (lbs)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full p-2 border rounded"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  value={formData.bloodSugar}
                  onChange={(e) => setFormData(prev => ({ ...prev, bloodSugar: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Blood Pressure (mmHg)</label>
                <input
                  type="text"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 120/80"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Cholesterol (mg/dL)</label>
                <input
                  type="number"
                  value={formData.cholesterol}
                  onChange={(e) => setFormData(prev => ({ ...prev, cholesterol: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50 text-white hover:text-black"
                  
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default HealthCalendar;