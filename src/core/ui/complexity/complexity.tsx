export const Complexity: React.FC<{
  complexity: number;

  onClick?: (index:number) => void;
}> = ({ complexity, onClick }) => {
  const computed = () => {
    if (complexity === 0) {
      return ["#8A99AF", "#8A99AF", "#8A99AF"];
    }
    if (complexity === 1) {
      return ["rgba(16, 185, 129, 0.99)", "#8A99AF", "#8A99AF"];
    }
    if (complexity === 2) {
      return ["#F0950C", "#F0950C", "#8A99AF"];
    }
    if (complexity === 3) {
      return ["#FB5454", "#FB5454", "#FB5454"];
    }
    return [];
  };

  return (
    <div
      style={{
        width: 60,
        height: 30,
        background: "#E2E8F0",
        borderRadius: 30,
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {computed().map((el, index) => (
        <div
          onClick={() => onClick?.(index)}
          style={{
            width: 9,
            height: 9,
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
            background: el,
            borderRadius: 90,
            margin: 2,
          }}
        ></div>
      ))}
    </div>
  );
};
