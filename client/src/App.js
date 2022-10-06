import styled, { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStyles, myTheme } from "./styled";
import Main from "./Pages/Main";
import Portfolio from "./Pages/Portfolio";
import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";
import Admin from "./Pages/Admin";
import Contact from "./Pages/Contact";
import AdminPortfolio from "./Pages/AdminPortfolio";
import AdminContact from "./Pages/AdminContact";
import Footer from "./Components/Footer";
import PortfolioDetail from "./Pages/PortfolioDetail";
import { device } from "./device";
import ScrollToTop from "./Components/ScrollToTop";
import Metatag from "./Components/Metatag";

const Wrapper = styled.div`
    min-height: 100vh;

    position: relative;
    padding-bottom: 160px;
    @media ${device.mobile} {
        padding-bottom: 90px;
    }
`;

function App() {
    return (
        <>
            <Metatag />
            <Router>
                <ScrollToTop />
                <ThemeProvider theme={myTheme}>
                    <GlobalStyles />
                    <Wrapper>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="admin/portfolio" element={<AdminPortfolio />} />
                            <Route path="/admin/project" element={<AdminContact />} />
                        </Routes>
                        <Footer />
                    </Wrapper>
                    <ToastContainer
                        theme="dark"
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={true}
                        pauseOnHover={false}
                    />
                </ThemeProvider>
            </Router>
        </>
    );
}

export default App;
