import { useNavigate } from 'react-router-dom';
import * as s from "./CateButtonsStyle";

const categories = [
    { id: 1, name: 'K-POP' },
    { id: 2, name: '애니메이션' },
    { id: 3, name: '영화/드라마' },
    { id: 4, name: '게임' },
];

const CateButtons: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/category/${id}`);
    };

    return (
        <s.ButtonWrap>
            {categories.map((cat) => (
                <s.CateButton key={cat.id} onClick={() => handleClick(cat.id)}
                >
                    {cat.name}
                </s.CateButton>
            ))}
        </s.ButtonWrap>
    );
};

export default CateButtons;

