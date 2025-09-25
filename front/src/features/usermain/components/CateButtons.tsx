import { useNavigate } from 'react-router-dom';
import CSS from './UserMainComponents.module.css';

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
        <div className={CSS.buttonWrap}>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={CSS.cateButton}
                    onClick={() => handleClick(cat.id)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default CateButtons;