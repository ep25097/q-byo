"use client";

import { useState } from "react";

export default function Home() {

  const [userName, setUserName] =
    useState("");

  async function startQuiz() {

    const uid =
      crypto.randomUUID();

    localStorage.setItem(
      "uid",
      uid
    );

    await fetch(
      "/api/startQuiz",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          uid,
          userName,
        }),
      }
    );

    window.location.href =
      "/quiz";
  }

  return (
    <main style={{ padding: "40px" }}>

      <h1>クイズアプリ</h1>

      <input
        type="text"
        placeholder="名前を入力"
        value={userName}
        onChange={(e) =>
          setUserName(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={startQuiz}
      >
        クイズ開始
      </button>

      <br />
      <br />

      <a href="/ranking">
        ランキング
      </a>

    </main>
  );
}