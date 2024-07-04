// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  students: {
    id: number;
    name: string;
    age: number;
    grade: string;
  }[];
  status: boolean;
  statusCode: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const students = [
    { id: 1, name: "John Doe", age: 20, grade: "8" },
    { id: 2, name: "Jane Doe", age: 21, grade: "22" },
    { id: 3, name: "John Smith", age: 22, grade: "10" },
    { id: 4, name: "Jane Smith", age: 23, grade: "15" },
  ];
  res.status(200).json({ status: true, statusCode: 200, students });
}
