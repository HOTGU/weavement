import React, { useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { throttle } from "lodash";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import defaultLogo from "../images/default_logo.png";
import scrollLogo from "../images/scroll_logo.png";
import { device } from "../device";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/isAuth";

const SideNavbar = ({ show, setShow }) => {
    const { pathname } = useLocation();
    const user = useRecoilValue(userAtom);
    const ref = useRef();

    useOutsideClick(ref, () => setShow(false));

    return (
        <>
            <SideNavbarContainer show={show}>
                <SideNavbarItem ref={ref} show={show}>
                    {pathname.includes("admin") && user?.isAdmin ? (
                        <>
                            <Link
                                to="/"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                홈
                            </Link>
                            <Link
                                to="/admin"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                분석
                            </Link>
                            <Link
                                to="/admin/project"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                프로젝트
                            </Link>
                            <Link
                                to="/admin/portfolio"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                포트폴리오
                            </Link>
                        </>
                    ) : (
                        <>
                            <a
                                href="https://blog.naver.com/weavement"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                전문가 칼럼
                            </a>
                            <Link
                                to="/portfolio"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                포트폴리오
                            </Link>
                            <Link
                                to="/contact"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                문의하기
                            </Link>
                            {user?.isAdmin && (
                                <Link
                                    to="/admin"
                                    className="nav__column"
                                    onClick={() => setShow(false)}
                                >
                                    Admin
                                </Link>
                            )}
                        </>
                    )}
                </SideNavbarItem>
            </SideNavbarContainer>
        </>
    );
};

const SideNavbarContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: ${(props) => (props.show ? "rgba(0,0,0,0.6)" : "")};
    visibility: ${(props) => (props.show ? "visible" : "hidden")};
    transition: visibility ${(props) => (props.show ? "0s 0s" : "0s 0.3s")},
        background-color 0.3s ease-in-out;
`;
const SideNavbarItem = styled.div`
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: white;
    right: 0;
    top: 0;
    color: black;
    transform: ${(props) => (props.show ? "none" : "translateX(250px)")};
    transition: all 0.3s ease-in-out;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav__column {
        width: 100%;
        transition: all 0.1s linear;
        padding: 20px 30px;
        font-size: 20px;
        border-bottom: 1px solid ${(props) => props.theme.borderColor};
        &:hover {
            background-color: ${(props) => props.theme.accentColor};
            color: white;
        }
    }
`;

function Navbar() {
    const [show, setShow] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const user = useRecoilValue(userAtom);

    const { pathname } = useLocation();

    const isMain = Boolean(pathname === "/");

    const handleScroll = useMemo(
        () =>
            throttle(() => {
                if (window.scrollY === 0) return setIsScroll(false);
                if (window.scrollY > 0) return setIsScroll(true);
            }, 200),
        [setIsScroll]
    );

    const showSidebar = () => setShow(!show);

    useEffect(() => {
        if (isMain) {
            window.addEventListener("scroll", handleScroll);
        }
    });

    return (
        <NavbarContainer className="wide-container" isMain={isMain} isScroll={isScroll}>
            <Wrapper className="default-container">
                <Link to="/">
                    <img
                        src={isMain ? (isScroll ? defaultLogo : scrollLogo) : defaultLogo}
                        alt="logo"
                        className="logo"
                    />
                </Link>
                <nav>
                    {pathname.includes("admin") && user?.isAdmin ? (
                        <>
                            <Link to="/">홈</Link>
                            <Link to="/admin">분석</Link>
                            <Link to="/admin/project">프로젝트</Link>
                            <Link to="/admin/portfolio">포트폴리오</Link>
                        </>
                    ) : (
                        <>
                            <a
                                href="https://blog.naver.com/weavement"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                전문가 칼럼
                            </a>
                            <Link to="/portfolio">포트폴리오</Link>
                            <Link to="/contact">문의하기</Link>
                            {user?.isAdmin && <Link to="/admin">Admin</Link>}
                        </>
                    )}
                </nav>
                <SBtn
                    className="nav-btn"
                    onClick={showSidebar}
                    isMain={isMain}
                    isScroll={isScroll}
                >
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </SBtn>
                <SideNavbar show={show} setShow={setShow} />
            </Wrapper>
        </NavbarContainer>
    );
}

const NavbarContainer = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    font-size: 18px;
    font-weight: 700;
    z-index: 80;
    @media ${device.tablet} {
        height: 65px;
    }
    @media ${device.mobile} {
        height: 60px;
    }
    color: ${(props) =>
        props.isMain
            ? props.isScroll
                ? props.theme.textColor
                : "white"
            : props.theme.textColor};
    background-color: ${(props) =>
        props.isMain ? (props.isScroll ? props.theme.bgColor : "") : props.theme.bgColor};
    border-bottom: 1px solid
        ${(props) =>
            props.isMain
                ? props.isScroll
                    ? props.theme.borderColor
                    : "none"
                : props.theme.borderColor};
    transition: 0.3s;
`;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    position: relative;
    .logo {
        width: 70px;
        @media ${device.tablet} {
            width: 65px;
        }
        @media ${device.mobile} {
            width: 60px;
        }
    }
    nav {
        display: flex;
        gap: 15px;
    }
    .nav-btn {
        background-color: transparent;
        display: none;
        cursor: pointer;
    }
    @media ${device.tablet} {
        nav {
            display: none;
        }
        .nav-btn {
            display: block;
        }
    }
`;

const SBtn = styled.button`
    color: ${(props) =>
        props.isMain
            ? props.isScroll
                ? props.theme.textColor
                : "white"
            : props.theme.textColor};
`;

export default Navbar;
