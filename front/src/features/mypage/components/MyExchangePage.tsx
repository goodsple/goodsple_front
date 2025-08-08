import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import * as S from './MyExchangePage.styles';

const MyExchangePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHistory = location.pathname.includes('history');

    return (
        <S.Container>
            <S.TabWrapper>
                <S.Tab $active={!isHistory} onClick={() => navigate('/exchange')}>
                    내 거래글
                </S.Tab>
                <S.Tab $active={isHistory} onClick={() => navigate('/exchange/history')}>
                    거래내역
                </S.Tab>
            </S.TabWrapper>

            <Outlet />
        </S.Container>
    );
};

export default MyExchangePage;
