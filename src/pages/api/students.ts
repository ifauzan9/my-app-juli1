// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllData } from "@/utils/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  students: any;
  status: boolean;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const students = await getAllData("students");
  res.status(200).json({ status: true, statusCode: 200, students });
}
