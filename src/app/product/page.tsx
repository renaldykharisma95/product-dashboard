import Content from "@/components/content/content.component";
import ProductList from "@/containers/ProductList/ProductList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProductPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("ACCESS_TOKEN");
  const profile = cookieStore.get("PROFILE_LOGIN")?.value || "{}";

  if (!token) {
    redirect("/login");
  }
  return (
    <Content profile={profile}>
      <ProductList />
    </Content>
  );
};

export default ProductPage;
