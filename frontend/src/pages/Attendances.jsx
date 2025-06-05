import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import '../styles/attendance_table.css';

export default function Attendances() {
  const [attendances, setAttendances] = useState([]);

  const statusDisplay = {
    1: 'Present',
    2: 'Absent',
    3: 'Late',
    4: 'Excused'
  };

  useEffect(() => {
    const user_id = 1;
    const date = getCurrentTime();
    get_attendance(user_id, date);
  }, []);

  const getCurrentTime = () => {
    return new Date()
  };

  const get_attendance = (user_id, work_date) => {
    if (!attendances) {
      const url = "http://localhost:5000/ws/attendance_records?user_id=" + user_id + "&work_date="+ work_date;
      const response = apiService.get(url)
      if(!response){
        console.log("Response is null!");
        return;
      }
      setAttendances(response)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md text-center">
        {attendances ? (<div>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>出勤時間</th>
                <th>退勤時間</th>
                <th>現状</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.start_time}</td>
                  <td>{record.end_time}</td>
                  <td>{statusDisplay[record.status] || '未定'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : <div>データは見つかりません</div>}
      </div>
    </div>
  );
}