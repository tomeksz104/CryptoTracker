import ReactDOM from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={props.onClose} className={classes.modal}>
      <div
        className={`${classes.content} bg-white dark:bg-slate-800`}
        onClick={stopPropagation}
      >
        {props.children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const animationTiming = {
  enter: 400,
  exit: 400,
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={props.show}
          timeout={animationTiming}
          classNames={{
            enter: "",
            enterActive: classes.ModalOpen,
            exit: "",
            exitActive: classes.ModalClosed,
          }}
        >
          <Backdrop />
        </CSSTransition>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={props.show}
          timeout={animationTiming}
          classNames={{
            enter: "",
            enterActive: classes.ModalOpen,
            exit: "",
            exitActive: classes.ModalClosed,
          }}
        >
          <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
        </CSSTransition>,
        portalElement
      )}
    </>
  );
};

export default Modal;
