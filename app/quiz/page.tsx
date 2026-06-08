"use client";

import { useState } from "react";

export default function QuizPage() {

  const [finished,
    setFinished] =
    useState(false);

  async function finishQuiz() {

    const uid =
      localStorage.getItem("uid");

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
    <main style={{ padding: "40px" }}>

      <h1>クイズ画面</h1>

      <p>
        ここにクイズ問題を表示
      </p>

      {!finished ? (
        <button
          onClick={finishQuiz}
        >
          クイズ終了
        </button>
      ) : (
        <button
          onClick={() =>
            window.location.href =
              "/ranking"
          }
        >
          ランキングを見る
        </button>
      )}

    </main>
  );
}