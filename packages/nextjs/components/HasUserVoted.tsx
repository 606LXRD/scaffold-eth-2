import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function HasUserVoted({ pollId }: { pollId: bigint }) {
  const [userAddress, setUserAddress] = useState<string>("");

  // Хук для чтения данных о том, проголосовал ли пользователь
  const { data: hasVoted } = useScaffoldReadContract({
    contractName: "VotingContract", // Имя контракта
    functionName: "hasUserVoted", // Функция для проверки, проголосовал ли пользователь
    args: [pollId, userAddress], // Аргументы: идентификатор голосования и адрес пользователя
  });

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [isConnected, address]);

  if (hasVoted === undefined) return <p>Загрузка...</p>;

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "16px",
      }}
    >
      {hasVoted ? (
        <p style={{ fontSize: "20px", fontWeight: "600" }}>Вы уже проголосовали в этом голосовании.</p>
      ) : (
        <p style={{ fontSize: "20px", fontWeight: "600" }}>Вы ещё не проголосовали в этом голосовании.</p>
      )}
    </div>
  );
}
