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

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setRanking(data);
      });

    return () => unsubscribe();

  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h1>ランキング</h1>

      <table
        border={1}
        cellPadding={10}
        style={{
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>順位</th>
            <th>名前</th>
            <th>解答時間(ms)</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.userName}</td>
              <td>{user.solveTimeMs}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <br />

      <button
        onClick={() =>
          window.location.href = "/"
        }
      >
        ホームへ戻る
      </button>

    </div>
  );
}