import React from 'react';
import {
  Modal as ReactStrapModal,
  ModalBody as ReactStrapModalBody,
  ModalProps,
  ModalBodyProps
} from 'reactstrap';

interface ModalProperties extends ModalProps {
  children?: React.ReactNode;
}
interface ModalBodyProperties extends ModalBodyProps {
  children?: React.ReactNode;
}

export default function Modal({ children, ...args }: ModalProperties) {
  return <ReactStrapModal {...args}>{children}</ReactStrapModal>;
}
export function ModalBody(props: ModalBodyProperties) {
  return <ReactStrapModalBody {...props} />;
}
