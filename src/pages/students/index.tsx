import { getAllData, updateData } from "@/utils/firebase/service";
import axios from "axios";
import { useEffect, useState } from "react";
import EditStudentModal from "./modal";

type Students = {
  id: number;
  name: string;
  age: number;
  major: string;
  gender: string;
};

const Students = () => {
  const [students, setStudents] = useState<Students[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSelectedStudent, setEditSelectedStudent] =
    useState<Students | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllData("students");
    setStudents(data);
    setLoading(false);
  };

  const handleEditMode = (student: Students) => {
    setEditMode(true);
    setEditSelectedStudent(student);
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
    setEditSelectedStudent(null);
  };

  const handleSaveEditMode = async (editedStudent: Students) => {
    setEditMode(false);
    setEditSelectedStudent(null);
    // console.log(editedStudent);
    try {
      setLoading(true);
      const updated = await updateData("students", editedStudent);
      if (updated) {
        console.log("Data updated successfully");
        fetchData();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-500 border-b-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Major</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student.id}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{student.name}</td>
                <td className="border px-4 py-2 text-center">{student.age}</td>
                <td className="border px-4 py-2 text-center">
                  {student.major}
                </td>
                <td className="border px-4 py-2 text-center">
                  {student.gender}
                </td>
                <td className="border px-4 py-2 flex justify-center gap-4">
                  <button
                    onClick={() => handleEditMode(student)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md "
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editMode && (
        <EditStudentModal
          student={editSelectedStudent!}
          onSave={handleSaveEditMode}
          onCancel={handleCancelEditMode}
        />
      )}
    </div>
  );
};

export default Students;
