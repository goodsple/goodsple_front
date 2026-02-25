import { Client, type Frame } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import megaPhone from '../../assets/images/megaphone.png';
import * as s from './CommMegaPhoneBoxStyle.ts';

const CommMegaPhoneBox: React.FC = () => {
    const [message, setMessage] = useState<string>("확성기 채팅 내용❌");

    const chatRooms: Record<string, string> = {
        "K-POP": "K-POP 채팅방",
        "MOVIE": "영화/드라마 채팅방",
        "GAME": "게임 채팅방",
        "ANIMATION": "애니메이션 채팅방",
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        // 1️⃣ 초기 최신 메시지 가져오기 ✨수정됨
        const fetchLatest = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/chat/megaphone/latest", {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        const roomName = chatRooms[data.commRoomId] || data.commRoomId;
                        setMessage(`${roomName} => ${data.content}`);
                    }
                }
            } catch (err) {
                console.error("최신 확성기 메시지 조회 실패:", err);
            }
        };
        fetchLatest();

        // 2️⃣ STOMP 구독 ✨수정됨
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: "Bearer " + accessToken
            },
        });

        client.onConnect = (frame: Frame) => {
            client.subscribe("/topic/megaphone", (msg) => {
                try {
                    const body = JSON.parse(msg.body);
                    const roomName = chatRooms[body.commRoomId] || body.commRoomId;
                    setMessage(`${roomName} => ${body.content}`);
                } catch (err) {
                    console.error("메시지 처리 오류:", err);
                }
            });
        };

        client.onStompError = (frame: Frame) => {
            console.error("STOMP error:", frame.headers["message"], frame.body);
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <s.megaPhoneWrap>
            <img src={megaPhone} alt="확성기" />
            <p>{message}</p>
            <s.megaButton onClick={() => (window.location.href = "/community")}>
                참여하기
            </s.megaButton>
        </s.megaPhoneWrap>
    );
};

export default CommMegaPhoneBox;
