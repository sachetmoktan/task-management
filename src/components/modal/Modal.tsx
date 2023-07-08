import React from 'react';
import Modal, { ModalBody } from './index';
import {BsXLg} from 'react-icons/bs'

interface DeleteModalProps {
  isOpenModal: boolean;
  toggleModal: () => void;
  modalTitle?: string;
  children?: React.ReactNode;
  modalSize?: string;
  fullscreen?: boolean | "lg" | "sm" | "md" | "xl";
}

export default function ViewModal(props: DeleteModalProps) {
  const {
    isOpenModal, toggleModal, modalTitle, children, modalSize='lg', fullscreen= false
    } =
    props;

  React.useEffect(() => {
    if(isOpenModal) {
      const root = document.getElementById("root");
      root?.classList.add("bg-blur")
    }
    else {
      const root = document.getElementById("root");
      root?.classList.remove("bg-blur")

    }
  }, [isOpenModal])
  return (
    <Modal
      isOpen={isOpenModal}
      toggle={toggleModal}
      centered={true}
      scrollable={true}
      size={modalSize}
      fullscreen={fullscreen}
    >
      <div className="modal-header">
          <h6><b>{modalTitle ? modalTitle : ''}</b></h6>
          <h6 onClick={toggleModal} style={{cursor: "pointer"}}><BsXLg /></h6> 
      </div>
      <ModalBody
      >
        {children}
      </ModalBody>
    </Modal>
  );
}
