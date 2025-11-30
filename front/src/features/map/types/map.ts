export interface MapGood {
  id: number;
  name: string;
  tradeType: 'DIRECT' | 'BOTH' | 'DELIVERY'; 
  lat: number;
  lng: number;
  imageUrl: string;
}