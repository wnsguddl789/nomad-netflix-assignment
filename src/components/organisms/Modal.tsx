import styled from "@emotion/styled";
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { ModalPortal } from "@organisms";

import { useEscKeyCloseEvent } from "@hooks";

type Props = {
	isVisible: boolean;
	children: React.ReactNode;
	onClose: () => void;
} & ModalBackDropProps;

type ModalBackDropProps = {
	width?: `${number}%`;
	height?: `${number}%`;
};

const backDropVariants: Variants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
};

const Modal = ({ isVisible, children, onClose, width = "70%", height = "70%" }: Props) => {
	useEscKeyCloseEvent(onClose);

	return (
		<AnimatePresence>
			{isVisible && (
				<React.Fragment>
					<Overlay onClick={onClose} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
					<ModalPortal isVisible={isVisible}>
						<BackDrop
							width={width}
							className="backdrop"
							height={height}
							variants={backDropVariants}
							initial="hidden"
							animate="visible"
						>
							<Content>{children}</Content>
						</BackDrop>
					</ModalPortal>
				</React.Fragment>
			)}
		</AnimatePresence>
	);
};

const BackDrop = styled(motion.div)<ModalBackDropProps>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: ${({ width }) => width};
	height: ${({ height }) => height};

	overflow: hidden;
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
`;

const Content = styled(motion.div)`
	height: 100%;
	width: 100%;
	position: relative;

	background: #141414;

	border-radius: 12px;
	overflow: hidden;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
`;

export default Modal;
