export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    role: "Admin" | "User";
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    expiresAt: string;
    user: User
}