"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Home() {

  const saveData = async () => {

    try {

      await addDoc(collection(db, "test"), {
        message: "hello firebase",
        createdAt: new Date()
      });

      alert("保存成功");

    } catch (error) {

      console.error(error);

      alert("エラー発生");
    }
  };

  return (
    <main style={{ padding: "40px" }}>
      <button
        onClick={saveData}
        style={{
          padding: "20px",
          fontSize: "24px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Firestore保存
      </button>
    </main>
  );
}