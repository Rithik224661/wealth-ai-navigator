
import { PageLayout } from "@/components/layout/PageLayout";
import { Users } from "lucide-react";
import { UserProfile } from "@/components/profile/UserProfile";

const ProfilePage = () => {
  return (
    <PageLayout>
      <div className="mb-8 flex items-center gap-4">
        <Users className="h-8 w-8 text-wealth-teal" />
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and financial preferences
          </p>
        </div>
      </div>

      <UserProfile />
    </PageLayout>
  );
};

export default ProfilePage;
