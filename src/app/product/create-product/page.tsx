import Content from "@/components/content/content.component";
import AddProductForm from "@/containers/addproduct/addproduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CreateProductPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("ACCESS_TOKEN");
  const profile = cookieStore.get("PROFILE_LOGIN")?.value || "{}";

  if (!token) {
    redirect("/login");
  }
  return (
    <Content profile={profile}>
      <AddProductForm />
    </Content>
  );
};

export default CreateProductPage;
