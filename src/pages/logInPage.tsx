import loginBg1 from "../assets/loginBg1.jpg";
import loginBg2 from "../assets/loginBg2.jpg";
import loginBg3 from "../assets/loginBg3.jpg";
import loginBg4 from "../assets/loginBg4.jpg";
import { useSelector } from "react-redux";
import { useState, useEffect, FormEvent } from "react";
import { BackgroundContainer, LogInContainer, Title, InputContainer, Input, Button, MarginRight, Credentials, CredentialsData, cursorPointer } from "../components/pages/login/styles/loginStyles";
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { CursorPointer } from "../components/common/styles/icons";

interface RootState {
    auth: {
        error: string | null;
    };
}

interface LogInPageProps {
    onLogin: (username: string, password: string) => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ onLogin }) => {
    const images: string[] = [loginBg1, loginBg2, loginBg3, loginBg4];

    const [currentImage, setCurrentImage] = useState<string>(images[0]);
    const [passwordInput, setPasswordInput] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const error = useSelector((state: RootState) => state.auth.error);

    useEffect(() => {
        const tenSeconds = setInterval(() => {
        setCurrentImage((prevImage) => {
            const nextIndex = (images.indexOf(prevImage) + 1) % images.length;
            return images[nextIndex];
        });
        }, 10000);

        return () => clearInterval(tenSeconds);
    }, [images]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const togglePasswordVisibility = () => {
        setPasswordInput(!passwordInput);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    const setCredentials = (username: string, password: string) => {
        setUsername(username);
        setPassword(password);
        toast.info("Credentials copied successfully!")
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
                    <Input
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <MarginRight onClick={togglePasswordVisibility}>
                    {passwordInput ? <FaLock size={20} /> : <FaUnlock size={20} />}
                    </MarginRight>
                    <Input
                    type={passwordInput ? "password" : "text"}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </InputContainer>
                <Button type="submit">Login</Button>
                </form>
                <Credentials>
                    <div>
                        <CredentialsData>user@gmail.com</CredentialsData>
                        <CredentialsData>12345</CredentialsData>
                    </div>
                    <CursorPointer type="normal">
                        <MdOutlineAutoAwesome
                            size={30}   
                            onClick={() => setCredentials("user@gmail.com", "12345")}
                        >
                        </MdOutlineAutoAwesome>
                    </CursorPointer>
                </Credentials>

            </LogInContainer>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </BackgroundContainer>
    );
};