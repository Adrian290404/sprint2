import loginBg1 from "../assets/loginBg1.jpg"
import loginBg2 from "../assets/loginBg2.jpg"
import loginBg3 from "../assets/loginBg3.jpg"
import loginBg4 from "../assets/loginBg4.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../features/login/authThunk'
import { useState, useEffect, FormEvent } from 'react';
import { BackgroundContainer, LogInContainer, Title, InputContainer, Input, Button, MarginRight } from "../components/pages/login/styles/loginStyles";
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { AppDispatch } from "../features/store"

interface RootState {
    auth: {
        error: string | null;
    };
}

export const LogInPage = () => {
    const images: string[] = [
        loginBg1,
        loginBg2,
        loginBg3,
        loginBg4
    ];

    const [currentImage, setCurrentImage] = useState<string>(images[0]);
    const [passwordInput, setPasswordInput] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.auth.error);

    useEffect(() => {
        const tenSeconds = setInterval(() => {
            setCurrentImage(prevImage => {
                const nextIndex = (images.indexOf(prevImage) + 1) % images.length;
                return images[nextIndex];
            });
        }, 10000);

        return () => clearInterval(tenSeconds);
    }, [images]);

    const togglePasswordVisibility = () => {
        setPasswordInput(!passwordInput);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        dispatch(loginThunk(username, password));
    };

    return (
        <BackgroundContainer image={currentImage}>
            <LogInContainer>
                <form onSubmit={handleSubmit}>
                    <Title>Login</Title>
                    <InputContainer>
                        <MarginRight>
                            <FaUser size={20} />
                        </MarginRight>
                        <Input type="text" placeholder="Username" id="username" />
                    </InputContainer>
                    <InputContainer>
                        <MarginRight onClick={togglePasswordVisibility}>
                            {passwordInput ? <FaLock size={20} /> : <FaUnlock size={20} />}
                        </MarginRight>
                        <Input type={passwordInput ? "password" : "text"} placeholder="Password" id="password" />
                    </InputContainer>
                    {error && <div>{error}</div>}
                    <Button type="submit">Login</Button>
                </form>
            </LogInContainer>
        </BackgroundContainer>
    );
};