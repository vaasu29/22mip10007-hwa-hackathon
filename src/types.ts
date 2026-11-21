export interface Module {
  id: string;
  name: string;
  description: string;
  interactionType: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
  color: string;
}

export interface Adventure {
  id: string;
  name: string;
  modules: string[];
  description: string;
  difficulty: string;
  estimatedTime: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  modules?: string[];
  difficulty?: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
}

export type Difficulty = 'Explorer' | 'Adventurer' | 'Master';
export type Duration = 'Quick Quest' | 'Long Trail' | 'Ultimate Hunt';
