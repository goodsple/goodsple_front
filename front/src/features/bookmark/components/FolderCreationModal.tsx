import type React from 'react';
import { useEffect, useState } from 'react';
import checkIcon from '../../../assets/images/checkIcon.png';
import * as s from './FolderCreationModalStyle';

interface FolderCreationModalProps {
    isOpen : boolean;                                       // 모달 열림 여부
    onClose : () => void;                                   // 모달 닫기 콜백
    mode: 'create' | 'edit';                                // 생성 또는 수정 모드
    initialFolderName?: string;                             // 수정 시 기존 폴더명 
    initialColor?: string;                                  // 수정 시 기존 색상
    onSubmit: (name: string, color: string) => void;        // 확인 버튼 클릭 시 콜백
}

const colorOptions = ['#FF4B4B'
                    , '#F3A14A'
                    , '#FFC72E'
                    , '#75E87B'
                    , '#5BA86F'
                    , '#7D93CC'
                    , '#997BEB'
                    , '#FA7DDF']

const FolderCreationModal:React.FC<FolderCreationModalProps> = ({ 
                                                                    isOpen, 
                                                                    onClose,
                                                                    mode = 'create',
                                                                    initialFolderName = '',
                                                                    initialColor = colorOptions[0],
                                                                    onSubmit,
    }) => {

        const [folderName, setFolderName] = useState(initialFolderName);
        const [selectedColor, setSelectedColor] = useState(initialColor);

        // 모달이 열릴 때 초기값 설정 
        useEffect(() => {
            if (isOpen) {
                setFolderName(initialFolderName);
                setSelectedColor(initialColor);
            }
        }, [isOpen, initialFolderName, initialColor]);

        if(!isOpen) return null;

        const handleConfirm = () => {
            if(!folderName.trim()) return; 
            onSubmit(folderName.trim(), selectedColor);
            onClose();
        };

        return (
            <s.Overlay onClick={onClose}>
                <s.ModalContainer onClick={(e) => e.stopPropagation()}>
                    <s.FolderTitleBox>
                        <p>{mode === 'create' ? '새 폴더 추가' : '폴더 수정'}</p>
                    </s.FolderTitleBox>

                    <s.FolderNameInputBox
                            type="text"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            placeholder="폴더 명을 입력해주세요."
                    />

                    {/* 폴더 색상 선택 */}
                    <s.FolderColorSelector>
                        <label>색상 선택</label>
                        <s.ColorOptions>
                                {colorOptions.map((color) => (
                                    <s.ColorDot
                                        key={color}
                                        color={color}
                                        selected={selectedColor === color}
                                        onClick={() => setSelectedColor(color)}
                                        checkImg={checkIcon}
                                    />
                                ))}
                        </s.ColorOptions>
                    </s.FolderColorSelector>
                    
                    {/* 취소 / 확인 버튼 */}
                    <s.FolderBtnGroup>
                        <s.CancelBtn onClick={onClose}>취소</s.CancelBtn>
                        <s.ConfirmBtn onClick={handleConfirm}>{mode === 'create' ? '추가' : '수정'}</s.ConfirmBtn>
                    </s.FolderBtnGroup>
                </s.ModalContainer>
            </s.Overlay>
  );
};

export default FolderCreationModal;