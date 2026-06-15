import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req: Request) {
  const { uid } =
    await req.json();

  const ref =
    doc(db, "results", uid);

  const snap =
    await getDoc(ref);

  if (!snap.exists()) {
    return Response.json(
      { error: "not found" },
      { status: 404 }
    );
  }

  const data = snap.data();

  console.log(data);

  if (!data.startTime) {
    return Response.json(
      { error: "startTime not found" },
      { status: 400 }
    );
  }

  const solveTimeMs =
    Date.now() -
    data.startTime.toMillis();

  await updateDoc(ref, {
    endTime: serverTimestamp(),
    solveTimeMs,
  });

  return Response.json({
    solveTimeMs,
  });
}