import React from "react";
import { KAKAO_AUTH_URL } from "../../components/OAuth";
import kakaoLoginLogo from "../../images/kakao_login.png"
// import KakaoLogin from "../../components/KakaoLogin";

function LoginPage() {

  return (
    <main id="login_section">
      <h2>👤 로그인</h2>
      <hr />
      <div id="login_form_container" className="mx-auto text-center">
        <a type="button" href={KAKAO_AUTH_URL}>
          <img src={kakaoLoginLogo} alt="카카오로그인"/>
        </a>
      </div>
    </main>
  );
}

export default LoginPage;
