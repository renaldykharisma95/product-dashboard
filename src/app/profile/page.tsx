import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Content = dynamic(
  () => import("@/components/content/content.component"),
  { ssr: false }
);

const ProfileView = dynamic(() => import("@/containers/Profile/Profile"), {
  ssr: false,
});

const ProfilePage = () => {
  const cookieStore = cookies();
  const profile = cookieStore.get("PROFILE_LOGIN")?.value || "{}";

  if (!profile || profile === "{}") {
    redirect("/login");
  }

  return (
    <Content profile={profile}>
      <ProfileView />
    </Content>
  );
};

export default ProfilePage;
