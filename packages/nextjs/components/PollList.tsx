import EndPoll from "~~/components/EndPoll";
import HasUserVoted from "~~/components/HasUserVoted";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function PollList() {
  const { data: pollCount } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollCount",
  });

  const renderPolls = () => {
    if (!pollCount) return <p>Загрузка...</p>;
    const polls = [];
    for (let i: number = 0; i < pollCount; i++) {
      polls.push(<PollItem key={i} pollId={BigInt(i)} />);
    }
    return polls;
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
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Список голосований</h2>
      {pollCount && pollCount > 0 ? renderPolls() : <p style={{ fontSize: "20px" }}>Нет активных голосований</p>}
      {}
    </div>
  );
}

function PollItem({ pollId }: { pollId: bigint }) {
  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollDetails",
    args: [BigInt(pollId)],
  });

  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  if (!data) return <p>Загрузка...</p>;

  const [question, options, , isActive] = data;
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#000000" }}>{question}</h3>
      <ul style={{ marginTop: "8px", marginBottom: "16px" }}>
        {options.map((opt: string, idx: number) => (
          <li key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#000000" }}>{opt}</span>
            {isActive && (
              <button
                onClick={() =>
                  writeContractAsync({
                    functionName: "vote",
                    args: [BigInt(pollId), BigInt(idx)],
                  })
                }
                style={{
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                Голосовать
              </button>
            )}
          </li>
        ))}
      </ul>
      {!isActive && <p style={{ color: "#ef4444" }}>Голосование завершено</p>}
      {}
      {isActive && <EndPoll pollId={pollId} />}
      {}
      <HasUserVoted pollId={pollId} />
      {}
    </div>
  );
}
