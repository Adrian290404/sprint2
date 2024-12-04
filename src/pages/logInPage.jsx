import loginBg1 from "../assets/loginBg1.jpg"
import loginBg2 from "../assets/loginBg2.jpg"
import loginBg3 from "../assets/loginBg3.jpg"
import loginBg4 from "../assets/loginBg4.jpg"
import { useState, useEffect } from "react"
import { BackgroundContainer, LogInContainer, Title, InputContainer, Input, Button, MarginRight } from "../components/pages/login/styles/loginStyles"
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";

export const LogInPage = ({onLogin}) => {
    const images = [
        loginBg1,
        loginBg2,
        loginBg3,
        loginBg4
    ]

    const [currentImage, setCurrentImage] = useState(images[0])
    const [passwordInput, setPasswordInput] = useState(true)

    useEffect(() => {
        const tenSeconds = setInterval(() => {
            setCurrentImage(prevImage => {
                const nextIndex = (images.indexOf(prevImage) + 1) % images.length
                return images[nextIndex];
            });
        }, 10000)

        return () => clearInterval(tenSeconds)
    }, [images])

    const togglePasswordVisibility = () => {
        setPasswordInput(!passwordInput)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (username === "user@gmail.com" && password === "1234") {
            onLogin()
        } else {
            alert("Invalid credentials!")
        }
    }

    return (
        <BackgroundContainer image={currentImage}>
            <LogInContainer>
                <form onSubmit={handleSubmit}>
                    <Title>Login</Title>
                    <InputContainer>
                        <MarginRight>
                            <FaUser size={20} />
                        </MarginRight>
                        <Input type="text" placeholder="Username" id="username"/>
                    </InputContainer>
                    <InputContainer>
                        <MarginRight onClick={togglePasswordVisibility}>
                            {passwordInput ? <FaLock size={20} /> : <FaUnlock size={20} />}
                        </MarginRight>
                        <Input type={passwordInput ? "password" : "text"} placeholder="Password" id="password"/>
                    </InputContainer>
                    <Button type="submit">Login</Button>
                </form>
            </LogInContainer>
        </BackgroundContainer>
    )
}