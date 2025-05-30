import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Content = dynamic(
  () => import("@/components/content/content.component"),
  { ssr: false }
);

const HomeView = dynamic(() => import("@/containers/Home/Home"), {
  ssr: false,
});

export default async function Home() {
  const cookieStore = cookies();
  const profile = cookieStore.get("PROFILE_LOGIN")?.value || "{}";

  if (!profile || profile === "{}") {
    redirect("/login");
  }

  return (
    <Content profile={profile}>
      <HomeView />
    </Content>
  );
}
