import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import { getCSRFToken, signinApi, signupApi } from "../api";
import { userAtom } from "../atoms/isAuth";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import Button from "../Components/Button";
import Metatag from "../Components/Metatag";

function Auth() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userAtom);
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: "",
        verifyPassword: "",
        name: "",
    });

    const handleInput = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        getCSRFToken();
    }, []);

    useEffect(() => {
        if (user) {
            return navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        if (isSignup) {
            if (!input.email || !input.name || !input.password || !input.verifyPassword) {
                toast.error("빈칸이 있습니다");
                setLoading(false);
                return false;
            }
            try {
                await signupApi(input);
                setIsSignup(false);
                toast.success("회원가입에 성공했습니다");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        if (!isSignup) {
            if (!input.email || !input.password) {
                toast.error("빈칸이 있습니다");
                setLoading(false);
                return false;
            }
            try {
                const res = await signinApi(input);
                toast.success(`${res?.data?.user?.name}님 환영합니다`);
                setUser(res?.data?.user);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Metatag title="위브먼트 | 로그인" />
            <Container>
                <form>
                    {isSignup && (
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleInput}
                            placeholder="이름"
                        />
                    )}
                    <Input
                        name="email"
                        type="email"
                        value={input.email}
                        onChange={handleInput}
                        placeholder="이메일"
                    />
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={handleInput}
                        placeholder="비밀번호"
                    />
                    {isSignup && (
                        <Input
                            type="password"
                            name="verifyPassword"
                            value={input.verifyPassword}
                            onChange={handleInput}
                            placeholder="비밀번호 확인"
                        />
                    )}

                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <Loader /> : isSignup ? "회원가입" : "로그인"}
                    </Button>
                    <div onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
                        {isSignup ? "로그인하러가기" : "회원가입하러가기"}
                    </div>
                </form>
            </Container>
        </>
    );
}

const Container = styled.div`
    form {
        width: 100%;
        height: 100%;
        max-width: 300px;
        margin: 200px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;

        .toggle-btn {
            align-self: flex-end;
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;

export default Auth;
