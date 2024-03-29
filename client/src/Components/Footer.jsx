import React from "react";
import styled from "styled-components";
import { device } from "../device";
import LogoImg from "../images/default_logo.png";

function Footer() {
  return (
    <Container>
      <div className="default-container">
        <Wrapper>
          <Item>
            <div className="img-container toggle">
              <img src={LogoImg} alt="" />
            </div>
            {/* <div className="column-container">
                            <h3>위브먼트 WEAVEMENT | 313-47-00901</h3>
                            <div>
                                <span className="bold">E</span> contact@weavement.co.kr
                            </div>
                            <div>서울시 강서구 양천로 </div>
                        </div> */}
            <div className="column-container">
              <div>
                <span className="bold">E</span> contact@weavement.co.kr
              </div>
              <div>
                서울시 강서구 양천로 738 한강G트리타워, 711호 / 사업자등록번호
                313-47-00901
              </div>
              <div>&#169; 2022 WEAVEMENT CO.LTD. ALL RIGHTS RESERVED.</div>
            </div>
          </Item>
          <Item>
            <div className="column-container">
              <div className="toggle">전화 상담</div>
              <h4>010 . 6803 . 7181</h4>
              <div>영업시간 9:00-18:00 | 토,일 휴무</div>
            </div>
          </Item>
        </Wrapper>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  height: 160px;
  width: 100%;
  @media ${device.mobile} {
    height: 90px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  @media ${device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Item = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media ${device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    .toggle {
      display: none;
    }
  }
  img {
    height: 60px;
    @media ${device.tablet} {
      height: 50px;
    }
  }
  .column-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    font-weight: 300;
    @media ${device.tablet} {
      gap: 5px;
      font-size: 14px;
    }
    @media ${device.mobile} {
      margin-top: 5px;
      font-size: 10px;
      text-align: center;
    }
    h3 {
      font-weight: 500;
      font-size: 16px;
      @media ${device.tablet} {
        font-size: 14px;
      }
      @media ${device.mobile} {
        font-size: 12px;
        margin-bottom: 1px;
      }
    }
    h4 {
      font-size: 26px;
      font-weight: 500;
      @media ${device.tablet} {
        font-size: 20px;
      }
      @media ${device.mobile} {
        font-size: 16px;
      }
    }
    div {
      font-size: 14px;
      @media ${device.tablet} {
        font-size: 12px;
        margin-bottom: 1px;
      }
      @media ${device.mobile} {
        font-size: 10px;
        margin-bottom: 1px;
      }
      .bold {
        font-weight: 500;
      }
    }
  }
`;

export default Footer;
