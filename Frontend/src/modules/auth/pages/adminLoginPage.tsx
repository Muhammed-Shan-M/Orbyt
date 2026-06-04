'use client';

import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAdminLogin } from '../hooks/useAminLogin';
import { setCredentials } from '../store/auth.slice';
import { useAppDispatch } from '@/app/store/hook';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from '../validator/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useAdminLogin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), });

  const onSubmit = (data: LoginFormData) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          dispatch(
            setCredentials({
              user: response.user,
              accessToken: response.accessToken,
              isAuthenticated: true,
            })
          );

          navigate("/admin/dashboard");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00D084' }}>
              <span className="text-lg font-bold text-black">O</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Orbyt</span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to your admin account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Admin Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border"
            style={{
              borderColor: "rgba(0, 208, 132, 0.3)",
              backgroundColor: "rgba(0, 208, 132, 0.1)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#00D084" }}
            ></span>

            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#00D084" }}
            >
              Admin Access
            </span>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              EMAIL ADDRESS
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="admin@orbyt.com"
              {...register("email")}
              className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground"
              style={{ "--tw-ring-color": "#00D084" } as React.CSSProperties}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              PASSWORD
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground"
                style={{ "--tw-ring-color": "#00D084" } as React.CSSProperties}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/admin/forgot-password"
              className="text-sm transition-colors"
              style={{ color: "#00D084" }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-black font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
            style={{ backgroundColor: "#00D084" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#00c074")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#00D084")
            }
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Not an admin?{' '}
            <Link to="/" className="transition-colors" style={{ color: '#00D084' }}>
              Back to home
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 rounded-lg border border-border bg-card/30">
          <p className="text-xs text-muted-foreground">
            🔒 This is a restricted admin portal. Unauthorized access attempts are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
