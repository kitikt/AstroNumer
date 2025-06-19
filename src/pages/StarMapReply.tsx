import React from "react";
import ReactMarkdown from "react-markdown";

type StarMapReplyProps = {
  tReply: string;
};

const StarMapReply: React.FC<StarMapReplyProps> = ({ tReply }) => {
  const formattedReply = tReply.replace(/\\n/g, "\n");

  return (
    <div style={{ padding: "24px", borderRadius: "12px" }}>
      <ReactMarkdown>{formattedReply}</ReactMarkdown>
    </div>
  );
};

export default StarMapReply;
