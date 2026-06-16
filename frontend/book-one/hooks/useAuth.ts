"use client";

import { useState } from 'react';

import Cookies from 'js-cookie';

import { AuthUser } from '@/types/user.types';


export const useAuth = () => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
        const token = Cookies.get('authToken');
        const storedUser = Cookies.get('authUser');
        const user = storedUser ? JSON.parse(storedUser) : null;

        return (token && user) ? { token: token, user: user } as AuthUser : null;
    });

    const [isLoading, setIsLoading] = useState(false);

    const login = (authUser: AuthUser) => {
        Cookies.set('authToken', authUser.token, { expires: 7, secure: true });
        Cookies.set('authUser', JSON.stringify(authUser.user), { expires: 7, secure: true })
        setAuthUser(authUser);
        setIsLoading(false);
    };

    const logout = () => {
        Cookies.remove('authToken');
        Cookies.remove('authUser');
        setAuthUser(null);
        setIsLoading(false);
    };

    return { authUser, login, logout, isLoading };
};
