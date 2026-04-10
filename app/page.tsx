"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Confetti() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 1.5,
      color: ["#FF0000", "#FFD700", "#0066FF"][Math.floor(Math.random() * 3)],
    }))
  }, [])

  if (!showConfetti) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: "-30px",
            width: 10,
            height: 10,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  )
}

type GameState = "select" | "play" | "result"

interface Question {
  multiplicand: number
  multiplier: number
  answer: number
  choices: number[]
}

function generateQuestionPool(selectedNumber: number): Question[] {
  const questions: Question[] = []

  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < 5; j++) {
      const answer = selectedNumber * i
      const wrongs = new Set<number>()

      while (wrongs.size < 3) {
        const n = answer + Math.floor(Math.random() * 8) - 4
        if (n > 0 && n !== answer) wrongs.add(n)
      }

      const choices = [answer, ...Array.from(wrongs)].sort(() => Math.random() - 0.5)

      questions.push({
        multiplicand: selectedNumber,
        multiplier: i,
        answer,
        choices,
      })
    }
  }

  return questions.sort(() => Math.random() - 0.5)
}

export default function MultiplicationGame() {
  const [gameState, setGameState] = useState<GameState>("select")
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  const currentQuestion = questions[currentIndex]

  const startGame = (num: number) => {
    setSelectedNumber(num)
    setQuestions(generateQuestionPool(num))
    setCurrentIndex(0)
    setCorrectCount(0)
    setFeedback(null)
    setGameState("play")
  }

  const handleAnswer = (choice: number) => {
    if (!currentQuestion || feedback) return

    if (choice === currentQuestion.answer) {
      setFeedback("correct")
      setCorrectCount((prev) => prev + 1)
    } else {
      setFeedback("wrong")
    }
  }

  const nextQuestion = useCallback(() => {
    if (correctCount >= 29) {
      setGameState("result")
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setFeedback(null)
  }, [correctCount])

  useEffect(() => {
    if (feedback === "correct") {
      const timer = setTimeout(nextQuestion, 1000)
      return () => clearTimeout(timer)
    }
  }, [feedback, nextQuestion])

  if (gameState === "select") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button key={num} onClick={() => startGame(num)} className="h-24 text-3xl">
              {num}단
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === "result") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Confetti />
        <p className="text-5xl font-bold">축하합니다!</p>
        <p className="text-3xl">{selectedNumber}단 마스터</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      {currentQuestion && (
        <div className="rounded-3xl bg-white p-10 shadow-xl text-center">
          <p className="text-6xl font-bold">
            {feedback === "correct"
              ? `${currentQuestion.multiplicand} × ${currentQuestion.multiplier} = ${currentQuestion.answer}`
              : `${currentQuestion.multiplicand} × ${currentQuestion.multiplier}`}
          </p>
          {feedback && (
            <p className="mt-4 text-2xl font-bold">
              {feedback === "correct" ? "정답!" : "다시 도전!"}
            </p>
          )}
        </div>
      )}

      {currentQuestion && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {currentQuestion.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(choice)}
              disabled={feedback !== null}
              className={cn("h-24 text-4xl")}
            >
              {choice}
            </Button>
          ))}
        </div>
      )}

      {feedback === "wrong" && (
        <Button onClick={() => setFeedback(null)} className="h-14 px-8 text-2xl">
          다시도전
        </Button>
      )}
    </div>
  )
}
