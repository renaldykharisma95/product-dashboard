import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Content = dynamic(
  () => import("@/components/content/content.component"),
  { ssr: false }
);

const AddProductForm = dynamic(
  () => import("@/containers/addproduct/addproduct"),
  { ssr: false }
);

const CreateProductPage = () => {
  const cookieStore = cookies();
  const profile = cookieStore.get("PROFILE_LOGIN")?.value || "{}";

  if (!profile || profile === "{}") {
    redirect("/login");
  }

  return (
    <Content profile={profile}>
      <AddProductForm />
    </Content>
  );
};

export default CreateProductPage;
