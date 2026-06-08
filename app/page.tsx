export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>クイズアプリ</h1>

      <p>メニュー</p>

      <ul>
        <li>
          <a href="/quiz">クイズ開始</a>
        </li>
        <li>
          <a href="/ranking">ランキング</a>
        </li>
      </ul>
    </main>
  );
}