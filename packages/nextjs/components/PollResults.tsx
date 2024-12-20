import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function PollResults() {
  const [pollId, setPollId] = useState<number>(-1);

  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getResults",
    args: [BigInt(pollId)],
  });

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
      <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Результаты голосования</h3>
      <input
        type="text"
        placeholder="ID голосования"
        onChange={e => setPollId(e.target.value ? Number(e.target.value) : -1)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          background: "#ffffff",
          color: "#000000",
          borderRadius: "8px",
        }}
      />
      {data && (
        <div
          style={{
            padding: "24px",
            background: "#385183",
            color: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <ul>
            {data[0].map((option: string, idx: number) => (
              <li key={idx} style={{ fontSize: "18px", marginBottom: "8px" }}>
                {option}: {Number(data[1][idx])} голосов
                {}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
