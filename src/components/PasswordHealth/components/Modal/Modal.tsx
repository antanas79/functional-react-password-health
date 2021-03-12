import React, { FC, useRef, useState } from "react";
import Modal from "react-modal";
import { IItem } from "~/services/getUserItems";
import updateItem from "~/services/updateItem";

import "./modal-style.scss";

interface IUpdateModal {
  item: IItem;
  reloadItems: () => Promise<void>;
}

const UpdateModal: FC<IUpdateModal> = ({ item, reloadItems }: IUpdateModal) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState("");
  const isMountedRef = useRef(null);

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button
            className={`button ${newPass.length > 0 ? "" : "disabled"}`}
            disabled={newPass.length > 0 ? false : true}
            onClick={async () => {
              const response = await updateItem({
                ...item,
                password: newPass,
              });

              if (response) {
                isMountedRef.current = true;
                await reloadItems();
                return () => (isMountedRef.current = false);
              }

              setNewPass("");
              setShowModal(false);
            }}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setNewPass("");
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateModal;
