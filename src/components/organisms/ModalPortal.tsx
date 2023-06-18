import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
type Props = {
	children: React.ReactNode;
	isVisible: boolean;
};

const ModalPortal = ({ children, isVisible }: Props) => {
	const portalElement = document.getElementById("modal") as HTMLElement;
	return ReactDOM.createPortal(
		<AnimatePresence>{isVisible && children}</AnimatePresence>,
		portalElement
	);
};

export default ModalPortal;
