import axios from "axios";
import React, { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";

const ManageUser = ({ userList, setUserList }) => {
  // modal-status
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [newNumHeart, setNewNumHeart] = useState(0);

  const handleRowClick = (id) => {
    const userInfos = userList.filter((user) => user.kakaoid === id);
    setSelectedUser(userInfos[0]);
    setNewNumHeart(userInfos[0].heart);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = () => {
    // 주문상태 변경 요청(저장)
    updateOrderStatus(selectedUser.kakaoid, newNumHeart);
    setModalOpen(false);
  };

  const handleNumHeartChange = (e) => {
    setNewNumHeart(e.target.value);
  };

  // UserList 최신화
  const getUserData = async () => {
    const allUserData = await axios.get(`info/all-user-data`);
    setUserList(allUserData.data.list);
  };

  const updateOrderStatus = async (userId, num) => {
    const result = await axios.post(`info/update-user-info`, {
      data: { id: userId, heartNum: num },
    });
    console.log("회원 정보 변경 요청 결과 : ", result);

    // 주문 현황 변경이 성공적으로 수행되면 새롭게 OrderData를 받아와 반영한다.
    if (result.data.code === "success") {
        getUserData();
    }
  };

  return (
    <section>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>하트 수</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((data, index) => {
            return (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => handleRowClick(data.kakaoid)}
              >
                <td>{data.nickname}</td>
                <td>{data.email}</td>
                <td>{data.heart}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* modal */}
      <Modal show={modalOpen} onHide={handleModalClose} size="sm">
        <Modal.Header>
          <Modal.Title>{selectedUser.nickname}님</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          현재 보유 ❤️ 수 : {selectedUser.heart}
          <br />
          변경할 하트 수
          <input
            type="text"
            onChange={(e) => handleNumHeartChange(e)}
            value={newNumHeart}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            저장 후 닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ManageUser;
