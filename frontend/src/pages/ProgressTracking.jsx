import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import HealthMetricsCharts from "../components/HealthMetricsCharts";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [healthData, setHealthData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    weight: "",
    bloodSugar: "",
    bloodPressure: "",
    cholesterol: "",
  });

  useEffect(() => {
    fetchProgressForMonth();
  }, [currentDate]);

  const fetchProgressForMonth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not authenticated.");
        return;
      }

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");

      const response = await axios.get(
        `http://localhost:3000/api/progress?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data.data;

      const mappedData = {};
      data.forEach((entry) => {
        mappedData[entry.date] = {
          weight: entry.weight,
          bloodSugar: entry.bloodSugar,
          bloodPressure: entry.bloodPressure,
          cholesterol: entry.cholesterol,
        };
      });
      setHealthData(mappedData);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

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
      days.push(
        <div key={`empty-${i}`} className="h-32 border border-gray-200" />,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasData = healthData[dateString];

      days.push(
        <div
          key={day}
          className={`relative h-32 cursor-pointer border p-4 transition-all duration-200 ease-in-out ${
            hasData ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-gray-100"
          }`}
          onClick={() => {
            setSelectedDate(dateString);
            if (hasData) {
              setFormData({
                weight: hasData.weight || "",
                bloodSugar: hasData.bloodSugar || "",
                bloodPressure: hasData.bloodPressure || "",
                cholesterol: hasData.cholesterol || "",
              });
            } else {
              setFormData({
                weight: "",
                bloodSugar: "",
                bloodPressure: "",
                cholesterol: "",
              });
            }
            setIsDialogOpen(true);
          }}
        >
          <div className="flex justify-between">
            <span className="text-lg font-medium">{day}</span>
            {hasData && (
              <div className="flex gap-1">
                {hasData.weight && (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
                {hasData.bloodSugar && (
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                )}
                {hasData.bloodPressure && (
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                )}
                {hasData.cholesterol && (
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                )}
              </div>
            )}
          </div>
          {hasData && (
            <div className="mt-1 text-xs text-gray-600">
              {hasData.weight && <div>Weight: {hasData.weight} lbs</div>}
              {hasData.bloodSugar && (
                <div>Blood Sugar: {hasData.bloodSugar}</div>
              )}
              {hasData.bloodPressure && <div>BP: {hasData.bloodPressure}</div>}
              {hasData.cholesterol && <div>Chol: {hasData.cholesterol}</div>}
            </div>
          )}
        </div>,
      );
    }

    return days;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        newData[key] = value;
      }
    });

    setHealthData((prev) => ({
      ...prev,
      [selectedDate]: newData,
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not authenticated.");
        return;
      }

      const payload = {
        date: selectedDate,
        weight: newData.weight,
        bloodSugar: newData.bloodSugar,
        bloodPressure: newData.bloodPressure,
        cholesterol: newData.cholesterol,
      };

      await axios.post("http://localhost:3000/api/progress", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }

    setFormData({
      weight: "",
      bloodSugar: "",
      bloodPressure: "",
      cholesterol: "",
    });
    setIsDialogOpen(false);
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div>
      <Navbar />
      <div className="mt-28 p-5 text-center text-2xl font-semibold text-white">
        <h1>Track Your Health Progress</h1>
        <p className="mt-2 text-sm text-gray-400">
          Log your daily health metrics to monitor changes over time and see if
          your diet and lifestyle are improving!
        </p>
      </div>

      <Card className="mx-auto mt-10 max-w-6xl bg-white shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-200"
                >
                  ←
                </button>
                <h2 className="text-2xl font-semibold">
                  {monthName} {year}
                </h2>
                <button
                  onClick={() => changeMonth(1)}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-200"
                >
                  →
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500" /> Weight
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500" /> Blood
                  Sugar
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" /> Blood
                  Pressure
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />{" "}
                  Cholesterol
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px rounded-lg bg-gray-100">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="rounded-tl-lg rounded-tr-lg bg-gray-200 p-2 text-center font-medium text-gray-800"
              >
                {day}
              </div>
            ))}
            {generateCalendarDays()}
          </div>
        </CardContent>
      </Card>

      <div className="mt-28 p-5 text-center text-2xl font-semibold text-white">
        <h1>Your Weekly Progress</h1>
        <p className="mt-2 text-sm text-gray-400">
          Visual Representation of Your Progress
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-6xl rounded-lg bg-gray-100 p-4 shadow-md">
        <HealthMetricsCharts healthData={healthData} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-lg bg-gray-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg text-white">
              Add Health Metrics for {selectedDate}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Weight (lbs)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, weight: e.target.value }))
                }
                className="w-full rounded-lg border bg-gray-900 p-3 text-white placeholder-gray-400"
                step="0.1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                value={formData.bloodSugar}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bloodSugar: e.target.value,
                  }))
                }
                className="w-full rounded-lg border bg-gray-900 p-3 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                value={formData.bloodPressure}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bloodPressure: e.target.value,
                  }))
                }
                className="w-full rounded-lg border bg-gray-900 p-3 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Cholesterol (mg/dL)
              </label>
              <input
                type="number"
                value={formData.cholesterol}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cholesterol: e.target.value,
                  }))
                }
                className="w-full rounded-lg border bg-gray-900 p-3 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthCalendar;
