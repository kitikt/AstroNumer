import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/profile/transaction-history");
  };

  return (
    <div>
      <h1>Tra cứu giao dịch tài khoản</h1>
      <p>Nhấn để xem lịch sử giao dịch chi tiết:</p>
      <button onClick={handleSearch}>Xem lịch sử giao dịch</button>
    </div>
  );
};

export default TransactionHistory;
