import { AdminDashboard } from "@/components/admin/admin-dashboard";
import {
  getAllUsers,
  getAllTokenRequests,
  getTokenUsageData,
  getUserTokenUsage,
} from "@/lib/db/queries";

export default async function AdminPage() {
  // const session = await auth();
  // if (!session?.user) redirect("/login");
  // const user = session.user as any;
  // if (!user.is_admin) redirect("/");

  const users = await getAllUsers();
  const tokenRequests = await getAllTokenRequests();
  const tokenUsageData = await getTokenUsageData();
  const userTokenUsage = await getUserTokenUsage();

  return (
    <section className="p-4 md:p-6 lg:p-8 w-full max-w-full mx-auto overflow-x-hidden">
      <div className="max-w-screen-xl w-full mx-auto">
        <AdminDashboard
          users={users}
          tokenRequests={tokenRequests}
          tokenUsageData={tokenUsageData}
          userTokenUsage={userTokenUsage}
        />
      </div>
    </section>
  );
}
