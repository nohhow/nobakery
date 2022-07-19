import axios from "axios";
import React, { useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";

function ManageProduct({ itemList, setItemList }) {
  // modal-status
  const [modalOpen, setModalOpen] = useState(false);

  // 등록 or 수정
  const [isRegister, setIsRegister] = useState(false);

  // productInfo
  const [itemId, setItemId] = useState();
  const [itemName, setItemName] = useState();
  const [itemSub, setItemSub] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemImg, setItemImg] = useState("");

  // content = front-data, uploadedImg = respond from back
  const [imgContent, setImgContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    filePath: "",
  });

  const BASE_URL = "http://localhost:3001";

  // 제품 등록
  const handleAddItemClick = () => {
    setIsRegister(true);
    setItemId(0);
    setItemName("");
    setItemSub("");
    setItemCategory("bread");
    setItemPrice(0);
    setItemImg("");
    setModalOpen(true);
  };

  const handleRowClick = (id) => {
    setIsRegister(false);
    const itemInfo = itemList.filter((item) => item.id === id);
    setItemId(itemInfo[0].id);
    setItemName(itemInfo[0].name);
    setItemSub(itemInfo[0].sub);
    setItemCategory(itemInfo[0].category);
    setItemPrice(itemInfo[0].price);
    setItemImg(itemInfo[0].img);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setUploadedImg({ fileName: "", filePath: "" });
    setModalOpen(false);
  };
  const handleModalSave = () => {
    updateItemList();
    setUploadedImg({ fileName: "", filePath: "" });
    setModalOpen(false);
  };

  // inputs
  const handleId = (value) => {
    setItemId(value);
  };
  const handleName = (value) => {
    setItemName(value);
  };
  const handleSub = (value) => {
    setItemSub(value);
  };
  const handleCategory = (value) => {
    setItemCategory(value);
  };
  const handlePrice = (value) => {
    setItemPrice(value);
  };

  const handleFile = (file) => {
    setImgContent(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("img", imgContent);
    axios
      .post("/info/img-upload", formData)
      .then((res) => {
        const { fileName } = res.data;
        console.log(fileName);
        setUploadedImg({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
        setItemImg(`${BASE_URL}/img/${fileName}`);
        alert("The file is successfully uploaded");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // itemList 최신화
  const getItemData = async () => {
    const allItemData = await axios.get(`info/products`);
    setItemList(allItemData.data.db);
  };

  // 제품 정보 update
  const updateItemList = async () => {
    const result = await axios.post(`info/update-products-info`, {
      data: {
        id: itemId,
        name: itemName,
        sub: itemSub,
        category: itemCategory,
        price: itemPrice,
        img: itemImg,
      },
    });
    console.log("제품 정보 변경 요청 결과 : ", result);

    // 제품 정보 변경이 성공적으로 수행되면 새롭게 itemData를 받아와 반영한다.
    if (result.data.code === "success") {
      getItemData();
    }
  };

  // 제품 등록
  const handleRegister = async () => {
    const result = await axios.post(`info/add-products-info`, {
      data: {
        id: itemId,
        name: itemName,
        sub: itemSub,
        category: itemCategory,
        price: itemPrice,
        img: itemImg,
      },
    });
    console.log("제품 정보 등록 요청 결과 : ", result);

    // 제품 정보 변경이 성공적으로 수행되면 새롭게 itemData를 받아와 반영한다.
    if (result.data.code === "success") {
      getItemData();
    }
    setModalOpen(false);
  };

  return (
    <section>
      <Button
        variant="warning"
        className="my-3"
        onClick={() => handleAddItemClick()}
      >
        제품 등록
      </Button>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>제품번호</th>
            <th>카테고리</th>
            <th>제품명</th>
            <th>간단설명</th>
            <th>이미지</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((data, index) => {
            return (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => handleRowClick(data.id)}
              >
                <td>{data.id}</td>
                <td>{data.category}</td>
                <td>{data.name}</td>
                <td>{data.sub}</td>
                <td>{data.img}</td>
                <td>{data.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* modal */}
      <Modal show={modalOpen} onHide={handleModalClose} size="lg">
        <Modal.Header>
          <Modal.Title>제품 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={itemImg} alt="제품사진" width={100} />
          <Form>
            <Form.Group className="mb-3" controlId="formId">
              <Form.Label>제품 번호</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleId(e.target.value)}
                value={itemId}
              />
              <Form.Text className="text-muted">
                빵, 디저트류는 100미만, 음료는 100이상
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>제품명</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleName(e.target.value)}
                value={itemName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSub">
              <Form.Label>간단설명</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleSub(e.target.value)}
                value={itemSub}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>카테고리</Form.Label>
              <Form.Select
                onChange={(e) => handleCategory(e.target.value)}
                defaultValue={itemCategory}
              >
                <option value={"bread"}>bread</option>
                <option value={"dessert"}>dessert</option>
                <option value={"beverage"}>beverage</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handlePrice(e.target.value)}
                value={itemPrice}
              />
            </Form.Group>
            {uploadedImg ? (
              <>
                <img src={uploadedImg.filePath} alt="" />
                <h3>{uploadedImg.fileName}</h3>
              </>
            ) : (
              ""
            )}
            <Form.Group controlId="form-group-id">
              <Form.Control
                type="file"
                name="img"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <Button variant="primary" onClick={() => handleUpload()}>
                upload
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
          {isRegister ? (
            <Button variant="primary" onClick={handleRegister}>
              등록하기
            </Button>
          ) : (
            <Button variant="primary" onClick={handleModalSave}>
              저장 후 닫기
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ManageProduct;
