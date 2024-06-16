export type ActionLoaderResponse<T> = {
  message?: string;
  data?: T;
};

export type UserResponse = {
  email: string;
  id: string;
  name: string;
  type: string;
  apNumber: number;
};

export type IconProps = {
  onClick?: () => void;
  className?: string;
  width?: string;
  height?: string;
};
