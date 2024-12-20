import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function EndPoll({ pollId }: { pollId: bigint }) {
  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  const handleEndPoll = async () => {
    try {
      await writeContractAsync({
        functionName: "endPoll",
        args: [pollId],
      });
      alert("Голосование завершено!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при завершении голосования.");
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#263759",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "16px",
      }}
    >
      <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Завершить голосование</h3>
      <p>Вы уверены, что хотите завершить голосование?</p>
      <button
        onClick={handleEndPoll}
        disabled={isMining}
        style={{
          marginTop: "16px",
          padding: "8px 24px",
          borderRadius: "8px",
          color: "#ffffff",
          backgroundColor: isMining ? "#6b7280" : "#e53e3e",
          cursor: isMining ? "not-allowed" : "pointer",
          transition: "background-color 0.3s",
        }}
      >
        {isMining ? "Завершение..." : "Завершить голосование"}
      </button>
    </div>
  );
}
