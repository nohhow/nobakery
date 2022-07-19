import React from "react";

function Footer() {
  return (
    <div>
      <footer className="p-4 d-flex justify-content-between">
        <div>
          <h5>NO BAKERY</h5>
          <p>노 베이커리는 특별한 사람들을 위한 온라인 주문 서비스 입니다.</p>
          <p className="font-italic">copyright 2022 By Jinhyun Noh</p>
        </div>
        <div>
          <h5>주인장</h5>
          <a href="mailto:jinhyeon.noh@gmail.com">
            <img
              alt="gmail"
              src="https://img.shields.io/badge/Gmail-FFF.svg?&style=for-the-badge&logo=gmail&logoColor=red"
            />
          </a>
          <a href="https://www.instagram.com/noh.jinhyeon">
            <img
              alt="instagram"
              src="https://img.shields.io/badge/Instagram-FFF.svg?&style=for-the-badge&logo=instagram&logoColor=red"
            />
          </a>
          <a href="https://github.com/nohhow">
            <img
              alt="github"
              src="https://img.shields.io/badge/Github-FFF.svg?&style=for-the-badge&logo=github&logoColor=black"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
