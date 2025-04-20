import LoginForm from "@/components/login/LoginForm";


const LoginPage = () => {
    return (
        <div style={{ backgroundImage: `url(/images/loginbackground.png)`, backgroundSize: 'cover', minHeight: '100vh', width: '100%' }}>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
                <LoginForm />
            </div>


        </div >
    )
}

export default LoginPage;