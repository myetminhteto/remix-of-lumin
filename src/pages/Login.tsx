import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Building2, Loader2, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { RoleToggle } from "@/components/auth/RoleToggle";
import { CountrySelect } from "@/components/auth/CountrySelect";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/contexts/AuthContext";
import { USER_ROLES, type UserRole } from "@/lib/constants";

export default function Login() {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(USER_ROLES.EMPLOYEE);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      country: "",
      role: USER_ROLES.EMPLOYEE,
    },
  });

  const selectedCountry = watch("country");

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    const { error } = await signIn(data.email, data.password);

    if (error) {
      setServerError(error.message);
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your LuminaHR account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Role Toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/80">
            I am signing in as
          </label>
          <RoleToggle
            value={selectedRole}
            onChange={handleRoleChange}
            disabled={isSubmitting}
          />
          {errors.role && (
            <p className="text-destructive text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Email */}
        <AuthInput
          label="Work email"
          type="email"
          icon={Mail}
          placeholder="you@company.com"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register("email")}
        />

        {/* Password */}
        <AuthInput
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Enter your password"
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register("password")}
        />

        {/* Company Name */}
        <AuthInput
          label="Company name"
          type="text"
          icon={Building2}
          placeholder="Your organization name"
          error={errors.companyName?.message}
          disabled={isSubmitting}
          {...register("companyName")}
        />

        {/* Country Select */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground/80">
            Country
          </label>
          <CountrySelect
            value={selectedCountry}
            onChange={(value) => setValue("country", value)}
            placeholder="Select ASEAN country"
            disabled={isSubmitting}
            error={!!errors.country}
          />
          {errors.country && (
            <p className="text-destructive text-sm flex items-center gap-1.5">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Server Error */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <p className="text-destructive text-sm font-medium">{serverError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign in
            </>
          )}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
