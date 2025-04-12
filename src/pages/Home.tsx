
export default function Home() {
    return (
        <div className="container">
            {/* Hình nền */}


            {/* Nội dung */}
            <div className="content">
                {/* Thanh điều hướng */}
                <header className="header">
                    <nav className="nav">
                        <div className="logo-container">
                            <div className="text-white">
                                <div className="relative w-[60px] h-[60px]">
                                    {/* Code vẽ logo, hoặc dùng thẻ img cho đơn giản */}
                                    <img src="/images/logo.png" alt="Logo" style={{ width: "100%", height: "100%" }} />
                                </div>
                            </div>
                            <span className="brand-text">ASTRONUMER</span>
                        </div>

                        <div className="menu">
                            <a href="#" className="link">Trang chủ</a>
                            <a href="#" className="link">Về chúng tôi</a>
                            <a href="#" className="link">Dịch vụ</a>
                            <a href="#" className="link">Blog</a>
                            <a href="#" className="link">Liên hệ</a>
                        </div>
                    </nav>
                </header>

                {/* Nội dung chính */}
                <main className="main">
                    {/* Mặt trăng phát sáng */}
                    <div className="moon-container">
                        {/* <div className="glow"></div>
                        <img
                            src="/images/moon.png"
                            alt="Glowing moon"
                            style={{ objectFit: "cover", borderRadius: "50%", width: "100%", height: "100%" }}
                        /> */}
                    </div>

                    {/* Tiêu đề */}
                    <h1 className="heading">
                        BẠN LÀ AI TRONG
                        <br />
                        VŨ TRỤ NÀY
                    </h1>

                    {/* Phụ đề */}
                    <p className="subheading">
                        Hãy khám phá hành trình của bạn giữa các vì sao và những con số cùng với Astronumer nhé
                    </p>

                    {/* Nút đăng nhập */}
                    <button className="button">ĐĂNG NHẬP</button>
                </main>
            </div>
        </div>
    );
}
