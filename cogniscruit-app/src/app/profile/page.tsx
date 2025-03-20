import AuthActions from "@/app/profile/AuthActions";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <AuthActions isAuthenticated={false} />
    </div>
  );
}
