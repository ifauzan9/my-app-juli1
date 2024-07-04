import { useState } from "react";
import Students from "./index";

type EditStudentModalProps = {
  student: Students;
  onSave: (student: Students) => void;
  onCancel: () => void;
};

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  student,
  onSave,
  onCancel,
}) => {
  const [editedStudent, setEditedStudent] = useState({ ...student });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "age") {
      setEditedStudent({ ...editedStudent, age: parseInt(value) });
    } else {
      setEditedStudent({ ...editedStudent, [name]: value });
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStudent({ ...editedStudent, gender: e.target.value });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(editedStudent);
    onSave(editedStudent);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Edit Student</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-2 w-[500px]">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedStudent.name}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={editedStudent.age}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <label>Major:</label>
          <input
            type="text"
            name="major"
            value={editedStudent.major}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded-md p-2"
          />
          {/* GENDER */}
          <label>Gender:</label>
          <select
            name="gender"
            value={editedStudent.gender}
            onChange={handleGenderChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            // onClick={handleSave}
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
