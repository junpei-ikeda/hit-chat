import React, { useState } from 'react';
import Clock from '../components/Clock';
import { apiService } from '../services/apiService';

export default function TimeCard() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClockIn = () => {
    if (!startTime) {
      const curr_time = getCurrentTime();
      const url = "http://localhost:5000/ws/attendance_records";
      const data = {
        user_id: 1,
        work_date: new Date(),
        start_time: curr_time,
        status: 1 
      }
      apiService.post(url,data)
      console.log("Created successfully!");
      setStartTime(curr_time);
    }
  };

  const handleClockOut = () => {
    if (startTime && !endTime) {
      const user_id = 1;
      const curr_time = getCurrentTime();
      const url = "http://localhost:5000/ws/attendance_records/" + user_id;
      const data = {
        end_time: curr_time,
        status: 2 
      }
      apiService.put(url,data)
      console.log("Updated successfully!");
      setEndTime(curr_time);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <Clock />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            {startTime && (
              <div className="mb-2 text-green-600 font-semibold">{startTime}</div>
            )}
            <button
              className="bg-blue-600 text-white py-4 px-6 rounded text-xl hover:bg-blue-700"
              onClick={handleClockIn}
              disabled={!!startTime}
            >
              出勤
            </button>
          </div>
          <div>
            {endTime && (
              <div className="mb-2 text-red-600 font-semibold">{endTime}</div>
            )}
            <button
              className={`py-4 px-6 rounded text-xl text-white ${
                startTime
                  ? 'bg-gray-400 hover:bg-gray-500'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={handleClockOut}
              disabled={!startTime || !!endTime}
            >
              退勤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}