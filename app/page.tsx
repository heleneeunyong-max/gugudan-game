return (
  <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
    {/* 상단 헤더 */}
    <div className="mb-8 flex w-full max-w-md items-center justify-between">
      <Button
        variant="ghost"
        onClick={goBack}
        className="text-lg font-medium text-muted-foreground"
      >
        ← 뒤로
      </Button>

      <div className="rounded-full bg-card px-5 py-2 shadow">
        <span className="text-lg font-semibold text-foreground">
          {correctCount} / {TOTAL_QUESTIONS}
        </span>
      </div>
    </div>

    {/* 문제 영역 */}
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      {currentQuestion && (
        <>
          <div className="mb-10 w-full max-w-md">
            <div
              className={cn(
                "rounded-3xl bg-card px-8 py-12 text-center shadow-xl transition-all",
                feedback === "correct" && "ring-4 ring-secondary",
                feedback === "wrong" && "ring-4 ring-destructive"
              )}
            >
              <p className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
                {currentQuestion.multiplicand} ×{" "}
                {currentQuestion.multiplier}
              </p>

              {feedback && (
                <p
                  className={cn(
                    "mt-6 text-3xl font-bold",
                    feedback === "correct"
                      ? "text-secondary-foreground"
                      : "text-destructive"
                  )}
                >
                  {feedback === "correct"
                    ? "정답!"
                    : "다시 도전!"}
                </p>
              )}
            </div>
          </div>

          {/* 보기 버튼 */}
          <div className="grid w-full max-w-md grid-cols-2 gap-5">
            {currentQuestion.choices.map((choice, index) => (
              <Button
                key={`${choice}-${index}`}
                onClick={() => handleAnswer(choice)}
                disabled={feedback !== null}
                className={cn(
                  "h-28 text-5xl font-bold shadow-lg transition-transform active:scale-95",
                  feedback === null
                    ? cn(
                        BUTTON_COLORS[
                          index % BUTTON_COLORS.length
                        ],
                        "text-white"
                      )
                    : choice === currentQuestion.answer
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {choice}
              </Button>
            ))}
          </div>

          {/* 오답 시 다음 문제 */}
          {feedback === "wrong" && (
            <Button
              onClick={nextQuestion}
              className="mt-8 h-16 px-10 text-2xl font-semibold bg-primary text-primary-foreground"
            >
              다음 문제
            </Button>
          )}
        </>
      )}
    </div>
  </div>
)
