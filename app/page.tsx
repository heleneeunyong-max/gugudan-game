"use client";

import { useState } from "react";

export default function Page() {
  const [selectedDan, setSelectedDan] = useState<number | null>(null);
  const [num, setNum] = useState(1);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCorrectEquation, setShowCorrectEquation] = useState(false);

  const nextProblem = () => {
    setNum(Math.floor(Math.random() * 9) + 1);
    setAnswer("");
    setResult("");
    setIsCorrect(null);
    setShowCorrectEquation(false);
  };

  const startDan = (dan: number) => {
    setSelectedDan(dan);
    setNum(Math.floor(Math.random() * 9) + 1);
    setAnswer("");
    setResult("");
    setIsCorrect(null);
    setShowCorrectEquation(false);
  };

  const checkAnswer = () => {
    if (!selectedDan) return;

    const correct = selectedDan * num;

    if (Number(answer) === correct) {
      setResult("정답입니다 🎉");
      setIsCorrect(true);
      setShowCorrectEquation(true);
    } else {
      setResult("틀렸어요 😢 다시 풀어보세요");
      setIsCorrect(false);
      setShowCorrectEquation(false);
    }
  };

  if (!selectedDan) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>구구단 게임</h1>
        <p style={{ marginTop: "20px", fontSize: "24px" }}>
          연습할 단을 선택하세요
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 140px)",
            gap: "18px",
          }}
        >
          {[2, 3, 4, 5, 6, 7, 8, 9].map((dan) => (
            <button
              key={dan}
              onClick={() => startDan(dan)}
              style={{
                height: "90px",
                borderRadius: "18px",
                border: "none",
                backgroundColor: "#4f46e5",
                color: "white",
                fontSize: "34px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {dan}단
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
        {selectedDan}단 연습
      </h1>

      <div
        style={{
          marginTop: "40px",
          width: "320px",
          height: "140px",
          borderRadius: "20px",
          backgroundColor: "#eef2ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "42px",
          fontWeight: "bold",
        }}
      >
        {showCorrectEquation
          ? `${selectedDan} × ${num} = ${selectedDan * num}`
          : `${selectedDan} × ${num}`}
      </div>

      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{
          marginTop: "30px",
          width: "180px",
          height: "60px",
          fontSize: "32px",
          textAlign: "center",
          borderRadius: "12px",
          border: "2px solid #ccc",
        }}
      />

      {isCorrect === null && (
        <button
          onClick={checkAnswer}
          style={{
            marginTop: "20px",
            width: "180px",
            height: "60px",
            fontSize: "26px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            cursor: "pointer",
          }}
        >
          정답 확인
        </button>
      )}

      {isCorrect === false && (
        <button
          onClick={() => {
            setAnswer("");
            setResult("");
            setIsCorrect(null);
          }}
          style={{
            marginTop: "20px",
            width: "180px",
            height: "60px",
            fontSize: "26px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
        >
          다시도전
        </button>
      )}

      {isCorrect === true && (
        <button
          onClick={nextProblem}
          style={{
            marginTop: "20px",
            width: "180px",
            height: "60px",
            fontSize: "26px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "white",
            cursor: "pointer",
          }}
        >
          다음문제
        </button>
      )}

      <p
        style={{
          marginTop: "24px",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {result}
      </p>
    </main>
  );
}
