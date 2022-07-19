import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "../../images/banner/banner1.png";
import banner2 from "../../images/banner/banner2.png";
import plusImg from "../../images/plus.png";

const MainPage = () => {
  const [todayPick, setTodayPick] = useState([
    {
      name: "...loading",
      img: `https://nohhow.github.io/assets/img/me/logo.png`,
    },
    {
      name: "...loading",
      img: `https://nohhow.github.io/assets/img/me/logo.png`,
    },
  ]);
  const [otherPick, setOtherPick] = useState(0)

  // 라우터 네비
  const navigate = useNavigate();

  useEffect(() => {
    let foods = [];
    let beverages = [];

    async function getProductsData() {
      const request = await axios.get(`/info/products`);
      const products = request.data.db;

      for (let x in products) {
        if (products[x].id > 100) {
          beverages.push(products[x]);
        } else {
          foods.push(products[x]);
        }
      }

      const randomValue = Math.floor(Math.random() * foods.length);
      const randomValue2 = Math.floor(Math.random() * beverages.length);

      const foodPick = foods[randomValue];
      const beveragePick = beverages[randomValue2];

      setTodayPick([foodPick, beveragePick]);
    }
    getProductsData();
  }, [otherPick]);

  return (
    <main>
      <Carousel pause="false" interval="3000" controls="" fade="true">
        <Carousel.Item>
          <img
            className=" d-block banner-img mx-auto"
            src={banner1}
            alt="First slide"
          />
          <Carousel.Caption className="bg-dark-75">
            <h3>레몬 마들렌</h3>
            <p>노진현이 자랑하는 시그니처 마들렌</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block banner-img mx-auto"
            src={banner2}
            alt="Second slide"
          />
          <Carousel.Caption className="bg-dark-75">
            <h3>초코 머핀</h3>
            <p>초코렛이 아낌없이 들어가 달콤함이 오래가는 머핀</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <article id="main_section" className="text-center">
        <div className="box text-start">
          <h5>NOTICE</h5>
          <ul>
            <li>노 베이커리의 모든 제품은 수익을 위한 판매용이 아닙니다.</li>
            <li>
              <Link to="order">
                <strong>📦 주문하기</strong>
              </Link>{" "}
              를 통해서 주문하면 이메일로 수령 날짜를 보내드립니다.
            </li>
          </ul>
        </div>
        <h1>이거 어때요?</h1>
        <div className="todayPick m-5">
          <Card
            className="w-25 d-inline-block "
            onClick={() => navigate(`/${todayPick[0].id}`)}
          >
            <div className="card-img-container">
              <Card.Img variant="top" src={todayPick[0].img} />
            </div>
            <Card.Title>{todayPick[0].name}</Card.Title>
          </Card>
          <img
            className="m-5"
            src={plusImg}
            width="25px"
            height="25px"
            alt="plus"
          />
          <Card
            className="w-25 d-inline-block"
            onClick={() => navigate(`/${todayPick[1].id}`)}
          >
            <div className="card-img-container">
              <Card.Img variant="top" src={todayPick[1].img} />
            </div>
            <Card.Title>{todayPick[1].name}</Card.Title>
          </Card>
          <Button className="d-block m-auto" variant="dark" onClick={() => setOtherPick(otherPick+1)}>
            다른 조합 보기
          </Button>
        </div>
      </article>
    </main>
  );
};

export default MainPage;
