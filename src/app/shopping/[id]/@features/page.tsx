export default function Features() {
  const features = [
    "A17 Pro chip for incredible performance",
    "Pro camera system with 5x Telephoto",
    "Titanium design - lightweight and durable",
    "All-day battery life",
    "iOS 17 with advanced features",
  ];

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#ffffff",
        maxWidth: "600px",
        margin: "10px"
      }}
    >
      <div
        style={{
          fontWeight: "600",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        Key Features
      </div>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          margin: 0,
          color: "#374151", // text-gray-700
          fontSize: "15px",
          lineHeight: "1.8",
        }}
      >
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
