import * as c from './ConfirmStyle'

type ConfirmModalProps = {
    isOpen: boolean;  // true면 모달 열리고, 아니면 모달 안열리고
    title?: string;  // 제목 있으면 보여지고, 아니면 생략
    content: string; // 모달 내용
    showCancel?: boolean; // true면 취소 버튼 표시, false면 확인 버튼만
    confirmText?: string; // 확인버튼 텍스트
    cancelText?: string;  // 취소버튼 텍스트
    onConfirm: () => void; // 확인 버튼 클릭 시 실행될 함수
    onCancel?: () => void;  // 취소 버튼 클릭 시 실행될 함수
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    content,
    showCancel = false,
    confirmText = "확인",
    cancelText = "취소",
    onConfirm,
    onCancel,
  }) => {
    if (!isOpen) return null;

    return(
        <c.ModalBg>
            <c.ModalWrap>
                {title && <c.ModalTitle>{title}</c.ModalTitle>}
            <c.ModalContent>{content}</c.ModalContent>

            <c.ButtonRow>
            {showCancel && <c.CancelButton onClick={onCancel}>{cancelText}</c.CancelButton>}
            <c.ConfirmButton onClick={onConfirm}>{confirmText}</c.ConfirmButton>
            </c.ButtonRow>
            </c.ModalWrap>

        </c.ModalBg>
    )
}
export default ConfirmModal;