import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const getData = async () => {
    const cartInfo = await axios.post(`/info/cart`, { data: { id: userId } });
    setCart(cartInfo.data.cartData); // cart에 배열 형태로 저장
    let temp_quantities = []
    for(let prop in cartInfo.data.cartData){
      temp_quantities.push(cartInfo.data.cartData[prop].quantity)
    }
    setQuantities(temp_quantities) // quantitiy는 수정가능하도록 따로 state관리
  };

  useEffect(() => {
    getData();
  }, []);

  let totalPrice = 0;
  for (let v in cart) {
    totalPrice += quantities[v] * cart[v].price;
  }

  const handleDelete = async (item) => {
    await axios.post(`/info/delete-cart-item`, {
      data: { itemid: item, userid: userId },
    });
    getData();
  };

  const handleClickQntBtn = (value, index) => {
    if (quantities[index] + value <= 5 && quantities[index] + value >= 1) {
      let new_quantities = [...quantities];
      new_quantities[index] = quantities[index] + value;
      setQuantities(new_quantities);
    }
  };

  const handleOrderClick = async () => {
    const userData = await axios.post(`/info/user-profile`, {
      data: { id: userId },
    });
    if (userData.status === 200) {
      const userProfile = userData.data.profile[0];
      let itemList = "";
      let quantityList = "";
      for (let property in cart) {
        itemList = itemList + cart[property].itemname + ",";
        quantityList = quantityList + quantities[property] + ",";
      }
      const requestResult = await axios.post(`/info/order`, {
        data: {
          userName: userProfile.nickname,
          email: userProfile.email,
          itemList: itemList,
          quantityList: quantityList,
          price: totalPrice,
        },
      });

      // sql문이 정상 동작했을 때(=주문 성공)
      if (requestResult.data.code === "success") {
        axios.post(`/info/cart-clear`, { data: { id: userId } });
        navigate("/order-complete");
      }
    } else {
      alert("서버가 응답하지 않습니다. 다시 시도해주세요.");
    }
  };

  if (!cart) return <div>...loading</div>;
  return (
    <div>
      <main id="cart_section">
        <h2>🛒 장바구니</h2>
        <hr />
        {cart.length > 0 ? (
          <article>
            <Table
              striped
              borderless
              responsive
              className="text-center align-middle"
            >
              <thead>
                <tr>
                  <th width="5%" scope="col"></th>
                  <th width="10%" scope="col">
                    이미지
                  </th>
                  <th width="15%" scope="col">
                    제품명
                  </th>
                  <th width="15%" scope="col">
                    수량
                  </th>
                  <th width="15%" scope="col">
                    금액
                  </th>
                  <th width="5%" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          width="auto"
                          height="70px"
                          src={data.image}
                          alt="제품이미지"
                        />
                      </td>
                      <td>{data.itemname}</td>
                      <td>
                        <button
                          type="button"
                          className="qnt-btn btn-l"
                          onClick={() => {
                            handleClickQntBtn(-1, index);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="num-inp"
                          readOnly="readonly"
                          min="1"
                          max="5"
                          value={quantities[index]}
                        />
                        <button
                          type="button"
                          className="qnt-btn btn-r"
                          onClick={() => {
                            handleClickQntBtn(+1, index);
                          }}
                        >
                          +
                        </button>
                        <span className="text-muted m-3">
                          <small>최대 5개</small>
                        </span>
                      </td>
                      <td>{data.price * quantities[index]} ❤️</td>
                      <td>
                        <CloseButton
                          onClick={() => handleDelete(data.itemid)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h3 className="text-end">총 비용 : {totalPrice} ❤️</h3>
            <div className="text-end">
              <Button
                className="btn-lg mt-3 "
                variant="dark"
                onClick={() => handleOrderClick()}
              >
                주문하기
              </Button>
            </div>
          </article>
        ) : (
          <h1 className="text-center mt-5">텅~</h1>
        )}
      </main>
    </div>
  );
}

export default CartPage;
