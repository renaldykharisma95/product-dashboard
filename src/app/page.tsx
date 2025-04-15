import Content from "@/components/content/content.component";
import HomeView from "@/containers/Home/Home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("ACCESS_TOKEN");

  if (!token) {
    redirect("/login");
  }
  return (
    <Content>
      <HomeView />
    </Content>
  );
}
