import { motion } from "framer-motion";
import { User, Calendar, FileText, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function EmployeeDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">L</span>
                </div>
                <span className="text-lg font-display font-bold text-foreground">
                  LuminaHR
                </span>
              </Link>
              <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                Employee
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Welcome to Your Workspace
            </h1>
            <p className="text-muted-foreground">
              Access your personal HR information and resources.
            </p>
          </div>

          {/* Placeholder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: User,
                title: "My Profile",
                description: "View and update your personal information",
                color: "feature-indigo",
              },
              {
                icon: Calendar,
                title: "Leave & Attendance",
                description: "Track your attendance and request time off",
                color: "feature-teal",
              },
              {
                icon: FileText,
                title: "Documents",
                description: "Access payslips and HR documents",
                color: "feature-amber",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-elevated p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`feature-icon feature-icon-${card.color.split("-")[1]} mb-4`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground italic">
                    Coming soon
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-12 p-6 rounded-xl bg-accent/5 border border-accent/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  You're logged in as Employee
                </h3>
                <p className="text-sm text-muted-foreground">
                  Access your personal workspace to view your profile, 
                  track attendance, and access important HR documents. 
                  Full features will be available in upcoming releases.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
