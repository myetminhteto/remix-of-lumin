import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";
import { USER_ROLES, type UserRole } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface RoleToggleProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

export function RoleToggle({ value, onChange, disabled }: RoleToggleProps) {
  const roles = [
    {
      id: USER_ROLES.ADMIN,
      label: "Admin (HR)",
      description: "Manage employees & organization",
      icon: Shield,
    },
    {
      id: USER_ROLES.EMPLOYEE,
      label: "Employee",
      description: "Access your workspace",
      icon: User,
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map((role) => {
        const isSelected = value === role.id;
        const Icon = role.icon;

        return (
          <motion.button
            key={role.id}
            type="button"
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={() => !disabled && onChange(role.id)}
            disabled={disabled}
            className={cn(
              "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300",
              isSelected
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                : "border-border/60 bg-card hover:border-primary/30 hover:bg-primary/[0.02]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                layoutId="roleIndicator"
                className="absolute inset-0 rounded-xl border-2 border-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="text-center">
              <p
                className={cn(
                  "font-semibold text-sm transition-colors duration-300",
                  isSelected ? "text-primary" : "text-foreground"
                )}
              >
                {role.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                {role.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
