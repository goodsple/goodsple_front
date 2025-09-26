import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import KakaoCallback from './features/auth/components/KakaoCallback.tsx';
import { AuthProvider } from './features/auth/contexts/AuthContext.tsx';
import { ReportProvider } from './features/report/ReportContext.tsx';

// 레이아웃(사용자,관리자)
import AdminLayout from './components/common/layouts/AdminLayout.tsx';
import Layout from './components/common/layouts/Layout.tsx';

// 사용자화면 컴포넌트
import Error from './components/common/error/Error';
import LiveAuctionPage from './features/auction/pages/LiveAuctionPage.tsx';
import FindId from './features/auth/components/FindId';
import FindPassword from './features/auth/components/FindPassword';
import KakaoInfo from './features/auth/components/KakaoInfo';
import Login from './features/auth/components/Login';
import SignUp from './features/auth/components/SignUp';
import BadgeGuide from './features/badge/components/BadgeGuide.tsx';
import CategorySelect from './features/category/pages/CategorySelect.tsx';
import ThirdCategory from './features/category/pages/ThirdCategory.tsx';
import EventViewPage from './features/eventzone/pages/EventViewPage.tsx';
import EventWritePage from './features/eventzone/pages/EventWritePage.tsx';
import EventZoneMain from './features/eventzone/pages/EventZoneMain.tsx';
import ExchangePost from './features/exchange/ExchangePost.tsx';
import ExchangePostDetail from './features/exchange/ExchangePostDetail.tsx';
import MapViewPage from './features/map/pages/MapViewPage';
import MyBidsPage from './features/mybids/pages/MyBidsPage';
import EditProfile from './features/mypage/components/EditProfile';
import MyExchangeHistory from './features/mypage/components/MyExchangeHistory.tsx';
import MyExchangePage from './features/mypage/components/MyExchangePage.tsx';
import MyExchangePosts from './features/mypage/components/MyExchangePosts.tsx';
import MyPage from './features/mypage/components/Mypage';
import NoticeDetail from './features/notice/NoticeDetail.tsx';
import NoticeList from './features/notice/NoticeList.tsx';
import Notification from './features/notification/pages/Notification.tsx';
import PaymentFailurePage from './features/payment/pages/PaymentFailurePage';
import PaymentPage from './features/payment/pages/PaymentPage';
import PaymentSuccessPage from './features/payment/pages/PaymentSuccessPage';
import MyReview from './features/review/components/MyReview';
import WriteReview from './features/review/components/WriteReview.tsx';
import UserMain from './features/usermain/pages/UserMain.tsx';
import BookmarkPage from './features/bookmark/components/BookmarkPage.tsx';
import Community from './features/community/components/Community.tsx';
import BookmarkFolderPage from './features/bookmark/components/BookmarkFolderPage.tsx';
import ChatBotPage from './features/chatbot/components/ChatBotPage.tsx';
import ExchangePostEdit from './features/exchange/ExchangePostEdit.tsx';
import ExchangeChatPage from './features/exchangeChat/page/ExchangeChatPage.tsx';

// 관리자화면 컴포넌트
import AdminAuctionCreatePage from './features/admin/wansu/pages/AdminAuctionCreatePage.tsx';
import AdminAuctionEditPage from './features/admin/wansu/pages/AdminAuctionEditPage.tsx';
import AdminAuctionPage from './features/admin/wansu/pages/AdminAuctionPage.tsx';
import AdminAuctionResultPage from './features/admin/wansu/pages/AdminAuctionResultPage.tsx';
import AdminChatLogDetailPage from './features/admin/wansu/pages/AdminChatLogDetailPage.tsx';
import AdminChatLogPage from './features/admin/wansu/pages/AdminChatLogPage.tsx';
import AdminKnowledgeBasePage from './features/admin/wansu/pages/AdminKnowledgeBasePage.tsx';
import AdminMain from './pages/AdminMain.tsx';

import AdminUserPage from './features/admin/auth/page/AdminUserPage.tsx';
import AdminCommunityDetailPage from './features/admin/community/pages/AdminCommunityDetailPage.tsx';
import AdminCommunityPage from './features/admin/community/pages/AdminCommunityPage.tsx';
import AdminKeywordMonitoring from './features/admin/keyword/AdminKeywordMonitoring.tsx';
import AdminNotice from './features/admin/notice/AdminNotice.tsx';
import AdminNoticeList from './features/admin/notice/AdminNoticeList.tsx';
import AdminProhibitedWordsPage from './features/admin/prohibitedWords/pages/AdminProhibitedWordsPage.tsx';
import AdminReportPage from './features/admin/report/page/AdminReportPage.tsx';
import AdminReviewPage from './features/admin/review/page/AdminReviewPage.tsx';
import AdminCategoryPage from './features/category/pages/AdminCategoryPage.tsx';
import AdminNoticeEdit from './features/admin/notice/AdminNoticeEdit.tsx';


function App() {
  return (
    <AuthProvider>
      <ReportProvider>
        <BrowserRouter>
          <Routes>
            {/* 사용자 레이아웃 적용 */}
            <Route element={<Layout />}>
              <Route path="/kakao/callback" element={<KakaoCallback />} />
              <Route index element={<UserMain />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/writereview" element={<WriteReview />} />
              <Route path="/reviews" element={<MyReview />} />

              <Route path="/exchange" element={<MyExchangePage />}>
                <Route index element={<MyExchangePosts />} />
                <Route path="history" element={<MyExchangeHistory />} />
              </Route>
              <Route path="/exchange-chat" element={<ExchangeChatPage />} />
              <Route path="/badgeguide" element={<BadgeGuide />} />
              <Route path="/bookmarkPage" element={<BookmarkPage />} />
              <Route path="/bookmarkPage/folder/:folderId" element={<BookmarkFolderPage />} />
              <Route path="/auction/live/:auctionId" element={<LiveAuctionPage />} />
              <Route path="/mypage/bids" element={<MyBidsPage />} />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
              <Route path="/payment/success" element={<PaymentSuccessPage />} />
              <Route path="/payment/failure" element={<PaymentFailurePage />} />
              <Route path="/map" element={<MapViewPage />} />
              <Route path="/notice" element={<NoticeList />} />
              <Route path="/notice/detail/:noticeId" element={<NoticeDetail />} />
              <Route path="/exchange/new" element={<ExchangePost />} />
              <Route path="/exchange/detail/:postId" element={<ExchangePostDetail />} />
              <Route path="/exchange/edit/:postId" element={<ExchangePostEdit />} />
              <Route path="/community" element={<Community />} />
              <Route path="/chatbot" element={<ChatBotPage />} />
              <Route path="/categories" element={<CategorySelect />} />
              <Route path="/category/:categoryId" element={<ThirdCategory />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/eventzone" element={<EventZoneMain />} />
              <Route path="/eventwrite" element={<EventWritePage />} />
              <Route path="/eventview" element={<EventViewPage />} />
            </Route>

            {/* 관리자 레이아웃 적용 */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminMain />} />
              <Route path="admin/users" element={<AdminUserPage />} />
              <Route path="admin/reviews" element={<AdminReviewPage />} />
              <Route path="admin/reports" element={<AdminReportPage />} />

              <Route path="/admin/auctions" element={<AdminAuctionPage />} />
              <Route path="/admin/auctions/create" element={<AdminAuctionCreatePage />} />
              <Route path="/admin/auctions/edit/:auctionId" element={<AdminAuctionEditPage />} />
              <Route path="/admin/auctions/:auctionId/result" element={<AdminAuctionResultPage />} />

              <Route path="/admin/chatbot/logs" element={<AdminChatLogPage />} />
              <Route path="/admin/chatbot/logs/:logId" element={<AdminChatLogDetailPage />} />
              <Route path="/admin/chatbot/knowledge" element={<AdminKnowledgeBasePage />} />

              <Route path="/admin/community" element={<AdminCommunityPage />} />
              <Route path="/admin/community/detail" element={<AdminCommunityDetailPage />} />
              <Route path="/admin/prohibitedwords" element={<AdminProhibitedWordsPage />} />

              <Route path="/admin/notice" element={<AdminNoticeList />} />
              <Route path="/admin/notice/new" element={<AdminNotice />} />
              <Route path="/admin/notice/:noticeId/edit" element={<AdminNoticeEdit />} />

              <Route path="/admin/keyword" element={<AdminKeywordMonitoring />} />
              <Route path="/admin/category" element={<AdminCategoryPage />} />
            </Route>

            {/* Layout 없이 단독 페이지 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/kakao" element={<KakaoInfo />} />
            <Route path="/findid" element={<FindId />} />
            <Route path="/findpwd" element={<FindPassword />} />

            {/* 에러 페이지 */}
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </ReportProvider>
    </AuthProvider>
  );
}
export default App;