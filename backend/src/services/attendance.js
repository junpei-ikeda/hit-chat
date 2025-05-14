const { executeQuery } = require('../utils/dbhelper');

// タイムカードー一覧取得
const getrecordsFromDB = async () => {
  try {
    const records = await executeQuery('SELECT * FROM attendance_record');
    return records;
  } catch (error) {
    console.error('Error fetching records from database:', error);
    throw new Error(`Error fetching records from database: ${error.message || 'Unknown error'}`);
  }
};

// タイムカードー一IDによる詳細取得
const getAttendanceByIdFromDB = async (id) => {
  try {
    const records = await executeQuery('SELECT * FROM attendance_records WHERE id = ?', [id]);
    if (!records || records.length === 0) {
      throw new Error(`Attendance with id ${id} not found`);
    }
    return records[0];
  } catch (error) {
    console.error('Error fetching attendance records by id from database:', error);
    throw new Error(`Error fetching attendance records by id from database: ${error.message || 'Unknown error'}`);
  }
};

// タイムカードー一IDによる詳細取得
const getAttendanceByUserIdAndDateFromDB = async (user_id, date) => {
  try {
    const records = await executeQuery('SELECT * FROM attendance_records WHERE user_id = ? AND date = ?', [user_id, date]);
    if (!records || records.length === 0) {
      throw new Error(`Attendance with user_id ${user_id} and date ${date} not found`);
    }
    return records;
  } catch (error) {
    console.error('Error fetching attendance records by user_id and date from database:', error);
    throw new Error(`Error fetching attendance records by user_id and date from database: ${error.message || 'Unknown error'}`);
  }
};

// 新しいタイムカードの作成
const createAttendanceInDB = async (user_id, date, clock_in_time, clock_out_time, status = 1) => {
  try {
    const result = await executeQuery(
      'INSERT INTO attendance_records (user_id, date, clock_in_time, clock_out_time, status) VALUES (?,?,?,?,?)',
      [user_id, date, clock_in_time, clock_out_time, status]
    );
    const newAttendance = {
      id: result.insertId, // 新しく作成されたタイムカードのID
      user_id,
      date: date.toISOString(),
      clock_in_time: clock_in_time.toISOString(),
      clock_out_time: clock_out_time.toISOString(),
      status
    };
    return newAttendance;
  } catch (error) {
    console.error('Error creating attendance record in database:', error);
    throw new Error(`Error creating attendance record in database: ${error.message || 'Unknown error'}`);
  }
};

// タイムカード情報の更新
const updateAttendanceInDB =  async (id, clock_in_time, clock_out_time, status) => {
  try {
    const result = await executeQuery(
      'UPDATE attendance_records SET clock_in_time = ?, clock_out_time = ?, status = ? WHERE id = ?',
      [clock_in_time, clock_out_time, status, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Attendance record with id ${id} not found`);
    }
    // 更新後のタイムカード情報を取得して返す
    const updatedAttendance = await getAttendanceByIdFromDB(id);
    return updatedAttendance;
  } catch (error) {
    console.error('Error updating attendance record in database:', error);
    throw new Error(`Error updating attendance record in database: ${error.message || 'Unknown error'}`);
  }
};

// タイムカードの削除
const deleteAttendanceFromDB = async (id) => {
  try {
    const result = await executeQuery('DELETE FROM attendance_records WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error(`Attendance with id ${id} not found`);
    }
    return { status: 1, message: `Attendance with id ${id} successfully deleted` };
  } catch (error) {
    console.error('Error deleting attendance record from database:', error);
    throw new Error(`Error deleting attendance record from database: ${error.message || 'Unknown error'}`);
  }
};

module.exports = {
  getrecordsFromDB,
  getAttendanceByUserIdAndDateFromDB,
  createAttendanceInDB,
  updateAttendanceInDB,
  deleteAttendanceFromDB,
};
