    import React from "react";
    import Button from "./Button";
    import "../styles/MainContent.css";

    const MainContent: React.FC = () => {
        return (
            <main className="main">


                <h1 className="heading">BẠN LÀ AI TRONG VŨ TRỤ NÀY</h1>
                <p className="subheading">
                    Hãy khám phá hành trình của bạn giữa các vì sao và những con số cùng với Astronumer nhé
                </p>
                <Button label="ĐĂNG NHẬP" />
            </main>
        );
    };

    export default MainContent;