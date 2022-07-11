import ReactDom from "react-dom";

import classes from './Modal.module.css';

const Backdrop = props => {
	return <div className={classes.backdrop} onClick={props.dismiss}/>
}

const ModalOverlay = props => {
	return <div className={classes.modal}>
		<div className={classes.content}>{props.children}</div>
	</div>
}

const Modal = props => {
	return (
		<div>
			{ReactDom.createPortal(<Backdrop dismiss={props.onDismiss}/>,
			document.getElementById('backdrop-root')
			)}
			{ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
			document.getElementById('overlay-root')
			)}
		</div>
	)
};

export default Modal;