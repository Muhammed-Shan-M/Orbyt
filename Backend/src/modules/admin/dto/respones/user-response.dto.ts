

export interface UserResponseDto {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isApproved: boolean;
  isEmailVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
}