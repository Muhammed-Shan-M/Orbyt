
export interface GetUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string | null;
  status?: string | null;
}