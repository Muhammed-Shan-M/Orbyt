export interface IUserListResponse {
  _id: string;
  fullName: string;
  email: string;
  isBlocked: boolean;
  createdAt: Date;
}

export interface IPaginatedUsers {
  users: IUserListResponse[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
}