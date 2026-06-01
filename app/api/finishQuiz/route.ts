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

  const start =
    snap.data().startTime.toMillis();

  const solveTimeMs =
    Date.now() - start;

  await updateDoc(ref, {
    endTime: serverTimestamp(),
    solveTimeMs,
  });

  return Response.json({
    solveTimeMs,
  });
}