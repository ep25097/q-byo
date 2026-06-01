"use client";

import { useEffect, useState } from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function RankingPage() {
  const [ranking, setRanking] =
    useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "results"),
      orderBy("solveTimeMs", "asc")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setRanking(data);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>ランキング</h1>

      {ranking.map((user, index) => (
        <div key={user.id}>
          {index + 1}位　
          {user.userName}
          {" "}
          {user.solveTimeMs}
          ms
        </div>
      ))}
    </div>
  );
}