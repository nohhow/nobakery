import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// images
import bread from "../../images/bread/set.jpg";
import forYou from "../../images/foryou.jpg";
import brownieBanner from "../../images/dessert/brownie_banner.jpg";

function InfoPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProductsData() {
      const request = await axios.get(`/info/products`);
      console.log(request);
      setProducts(request.data.db)
    }
    getProductsData();
  }, []);

  const navigate = useNavigate();

  return (
    <main id="info_section" className="text-center">
      <header id="info_header">
        <div className="ab-text">
          <h1> NO BAKERY</h1>
          <h3>Bread & Dessert</h3>
          <p>
            오직 당신만을 위한 레시피로 만들어진 빵과 디저트를 경험해보세요.
          </p>
        </div>
        <img
          className="opacity-75"
          src={brownieBanner}
          alt="Brownie"
          width="70%"
        />
      </header>
      <article className="text-start p-5">
        <h1 className="text-center py-5">노 베이커리에 대해서</h1>
        <Container className="p-5 border rounded-3">
          <Row>
            <Col sm={6} className="pb-5">
              <div className="history">
                <div>
                  <h3>2022.02</h3>
                  <ol>
                    <li>
                      <strong>첫 베이킹 도전</strong> - 플레인 쿠키, 초코 쿠키
                    </li>
                    <li>스모어 쿠키</li>
                  </ol>
                </div>

                <div>
                  <h3>2022.03</h3>
                  <ol>
                    <li>플레인 머핀, 초코 머핀</li>
                    <li>브라우니</li>
                    <li>꿀마들렌</li>
                  </ol>
                </div>

                <div>
                  <h3>2022.04</h3>
                  <ol>
                    <li>파운드 케이크</li>
                    <li>레몬 마들렌</li>
                  </ol>
                </div>
              </div>
            </Col>
            <Col sm={6} className="text-end">
              <div>
                <h1>짧은 경력, 오래 가는 여운</h1>
                <p className="pt-3">
                  베이킹을 시작한지 오래되지 않았지만 사랑으로 빵을 만들고
                  있습니다.
                  <br /> 한 번이라도 <strong>노 베이커리</strong>의 빵 맛을
                  본다면 긴 여운을 느끼실 수 있습니다.
                </p>
                <img
                  className="rounded-3 opacity-100 hover-opacity"
                  src={bread}
                  width="50%"
                  alt="breadImage"
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="p-5 my-5 border rounded-3">
          <Row>
            <Col sm={6} className="pb-5">
              <div>
                <h1>누구나 맛볼 수 없는 특별함</h1>
                <p className="pt-3">
                  노 베이커리는 특별한 분들만 주문할 수 있도록 안내해드리고
                  있습니다.
                  <br />
                  <br />
                  매일 빵을 만드는 것이 아니라, 주문이 들어오면 배송 날짜에
                  맞춰서 작업을 시작하고 <strong>최고의 상태</strong>로 고객님께
                  전달됩니다.
                </p>
              </div>
            </Col>
            <Col sm={6} className="text-end">
              <img
                className="rounded-3 opacity-100 hover-opacity"
                src={forYou}
                width="50%"
                alt="forYou"
              />
            </Col>
          </Row>
        </Container>
      </article>
      <article>
        <h1 className="text-center py-5">제품 목록</h1>
        <Container>
          <Row>
            {products.map((data, index) => {
              return (
                <Col sm={12} md={6} lg={4} key={index} className="py-3">
                  <Card>
                    <div
                      className="card-img-container"
                      onClick={() => navigate(`/${data.id}`)}
                    >
                      <Card.Img variant="top" src={data.img} alt={data.name} />
                    </div>
                    <Card.Body>{data.name}</Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </article>
    </main>
  );
}

export default InfoPage;
