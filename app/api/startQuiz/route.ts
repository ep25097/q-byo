import { db } from "@/lib/firebase";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req: Request) {
  const { uid, userName } =
    await req.json();

  await setDoc(
    doc(db, "results", uid),
    {
      userName,
      startTime: serverTimestamp(),
    },
    { merge: true }
  );

  return Response.json({
    success: true,
  });
}