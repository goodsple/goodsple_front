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
    folders: { name: string; color: string }[];
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
                                                                    folders,
                                                                    onSubmit,
    }) => {

        const [folderName, setFolderName] = useState(initialFolderName);
        const [selectedColor, setSelectedColor] = useState(initialColor);
        const [errorMessage, setErrorMessage] = useState('');

        // 모달이 열릴 때 초기값 설정 
        useEffect(() => {
            if (isOpen) {
                setFolderName(initialFolderName);
                setSelectedColor(initialColor);
                setErrorMessage('');
            }
        }, [isOpen, initialFolderName, initialColor]);

        if(!isOpen) return null;

        const handleConfirm = () => {
            const trimmedName = folderName.trim();

            // 폴더 이름 체크
            if (!trimmedName) {
                setErrorMessage('폴더 이름을 입력해주세요.');
                return;
            }

            // 폴더 이름 길이 체크 (20자 이하)
            if (trimmedName.length > 20) {
                setErrorMessage('폴더 이름은 20자 이내로 입력해주세요.');
                return;
            }

            if (folders.some((f) => f.name === trimmedName && f.name !== initialFolderName)) {
                setErrorMessage("이미 같은 이름의 폴더가 있습니다.");
                return;
            }

            setErrorMessage('');
            onSubmit(folderName.trim(), selectedColor);
        };

        const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            
            if (value.length > 20) { // 20자 제한 적용
                setFolderName(value.slice(0, 20));
                setErrorMessage('폴더 이름은 20자 이내로 입력해주세요.');
            } else {
                setFolderName(value);
                setErrorMessage('');
            }
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
                            onChange={handleChangeName}
                            placeholder="폴더 명을 입력해주세요."
                    />
                    <s.ErrorText>{errorMessage || '⠀'}</s.ErrorText>

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
                                        $checkImg={checkIcon}
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