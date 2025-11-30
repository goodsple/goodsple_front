export interface MyWonAuction {
  orderId: number; 
  auctionId: number;
  productName: string;
  imageUrl: string;
  auctionEndTime: string;  
  finalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'expired'; 
  paymentDueDate: string | null; 
}