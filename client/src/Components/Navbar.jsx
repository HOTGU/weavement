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

const SideNavbar = ({ show, setShow }) => {
    const { pathname } = useLocation();
    const ref = useRef();

    useOutsideClick(ref, () => setShow(false));

    return (
        <>
            <SideNavbarContainer show={show}>
                <SideNavbarItem ref={ref} show={show}>
                    {pathname.includes("admin") ? (
                        <>
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
                                프로젝트관리
                            </Link>
                            <Link
                                to="/admin/portfolio"
                                className="nav__column"
                                onClick={() => setShow(false)}
                            >
                                포트폴리오관리
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
                    {pathname.includes("admin") ? (
                        <>
                            <Link to="/admin">분석</Link>
                            <Link to="/admin/project">프로젝트관리</Link>
                            <Link to="/admin/portfolio">포트폴리오관리</Link>
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
    height: 100px;
    font-size: 18px;
    font-weight: 700;
    z-index: 100;
    @media ${device.tablet} {
        height: 90px;
    }
    @media ${device.mobile} {
        height: 80px;
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
        width: 85px;
        @media ${device.tablet} {
            width: 80px;
        }
        @media ${device.mobile} {
            width: 70px;
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
