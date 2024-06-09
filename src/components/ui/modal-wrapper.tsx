import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

type ModalWrapperProps = {
  children: React.ReactElement;
  isVisible: boolean;
};
export const ModalWrapper = ({ children, isVisible }: ModalWrapperProps) =>
  createPortal(
    <AnimatePresence>{isVisible && children}</AnimatePresence>,
    document.body,
  );
