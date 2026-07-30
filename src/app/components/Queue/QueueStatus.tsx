type Props = {
  status: string;
};

export default function QueueStatus({ status }: Props) {
  const styles = {
    waiting: "bg-[#EBF3FF] text-[#1A6BCC]",
    current: "bg-[#F0F0FF] text-[#6366F1]",
    done: "bg-[#E6F9F7] text-[#12B76A]",
    scheduled: "bg-[#FFF7E6] text-[#D97706]",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
