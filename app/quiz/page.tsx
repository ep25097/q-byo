"use client";

import { useState } from "react";

export default function QuizPage() {

  const [userName, setUserName] =
    useState("");

  const [uid] =
    useState(crypto.randomUUID());

  const [finished, setFinished] =
    useState(false);

  async function startQuiz() {

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

    alert("開始しました");
  }

  async function finishQuiz() {

    const res = await fetch(
      "/api/finishQuiz",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          uid,
        }),
      }
    );

    const data =
      await res.json();

    alert(
      "解答時間: " +
      data.solveTimeMs +
      "ms"
    );

    setFinished(true);
  }

  return (
    <div>
      <h1>クイズテスト</h1>

      <input
        type="text"
        placeholder="名前を入力"
        value={userName}
        onChange={(e) =>
          setUserName(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={startQuiz}>
        開始
      </button>

      <button onClick={finishQuiz}>
        終了
      </button>

      {finished && (
        <>
          <br />
          <br />

          <button
            onClick={() =>
              window.location.href =
                "/ranking"
            }
          >
            ランキングを見る
          </button>
        </>
      )}
    </div>
  );
}