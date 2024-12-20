import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreatePoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionInput, setOptionInput] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  const addOption = () => {
    if (optionInput.trim()) {
      setOptions([...options, optionInput.trim()]);
      setOptionInput("");
    }
  };

  const createPoll = async () => {
    if (question && options.length > 1 && duration > 0) {
      await writeContractAsync({
        functionName: "createPoll",
        args: [question, options, BigInt(duration)],
      });
    } else {
      alert("Пожалуйста, заполните все поля корректно.");
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "#385183",
        color: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Создать голосование</h2>
      <input
        type="text"
        placeholder="Вопрос голосования"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          background: "#ffffff",
          color: "#000000",
          borderRadius: "8px",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Добавить вариант ответа"
          value={optionInput}
          onChange={e => setOptionInput(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            marginRight: "8px",
            background: "#ffffff",
            color: "#000000",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={addOption}
          style={{
            backgroundColor: "#10b981",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Добавить вариант
        </button>
      </div>
      <ul style={{ marginBottom: "16px" }}>
        {options.map((opt, idx) => (
          <li key={idx} style={{ fontSize: "18px" }}>
            {opt}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Длительность (в секундах)"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          background: "#ffffff",
          color: "#000000",
          borderRadius: "8px",
        }}
      />
      <button
        onClick={createPoll}
        disabled={isMining}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          color: "#ffffff",
          backgroundColor: isMining ? "#6b7280" : "#3b82f6",
          cursor: isMining ? "not-allowed" : "pointer",
          transition: "background-color 0.3s",
        }}
      >
        {isMining ? "Создание..." : "Создать голосование"}
      </button>
    </div>
  );
}
