import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Verify() {

    const navigate = useNavigate();
    
    const getProfile = async () => {
      try {
        // Kakao SDK API를 이용해 사용자 정보 획득
        let data = await window.Kakao.API.request({
          url: "/v2/user/me",
        });
        // 사용자 정보 반환
        return {id : data.id, name : data.properties.nickname, img: data.properties.profile_image}
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getCheckDuplicate();
    }, []);
  
    const getCheckDuplicate = async () => {
      let profileData = await getProfile();

      const kakaoId = profileData.id
      const kakaoName = profileData.name

      // 회원 정보로 다음 동작 지정
      axios.get(`/info/check_user/${kakaoId}`).then(function (res) {
        const code = res.data.code[0].count;
        console.log(code);
        if (code === 0) {
          console.log("회원가입으로 이동합니다!!");
          navigate('/join', {state : {id : kakaoId, name: kakaoName}})
        } else {
          console.log("로그인 성공! 홈으로 이동합니다!");
          localStorage.clear();
          localStorage.setItem("id", kakaoId);
          navigate('/', {state : {isLogin : true}})
        }
      });
    };

  return (
    <div>...Loading</div>
  )
}

export default Verify