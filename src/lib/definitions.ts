export type Space = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string[];
  imageId: string;
};

export type Guest = {
  id: string;
  name: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  notified: boolean;
};
