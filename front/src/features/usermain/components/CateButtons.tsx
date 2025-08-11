import CSS from './UserMainComponents.module.css';

const CateButtons:React.FC = () => {

    return (
        <div className={CSS.buttonWrap}>
            <button className={CSS.cateButton}>K-POP</button>
            <button className={CSS.cateButton}>애니메이션</button>
            <button className={CSS.cateButton}>영화/드라마</button>
            <button className={CSS.cateButton}>게임</button>
        </div>
    )   
}

export default CateButtons;