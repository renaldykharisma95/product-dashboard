import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Content = dynamic(
  () => import("@/components/content/content.component"),
  { ssr: false }
);

const ProductList = dynamic(
  () => import("@/containers/ProductList/ProductList"),
  { ssr: false }
);

const ProductPage = () => {
  const cookieStore = cookies();
  const profile = cookieStore.get("PROFILE_LOGIN")?.value || "{}";

  if (!profile || profile === "{}") {
    redirect("/login");
  }
  
  return (
    <Content profile={profile}>
      <ProductList />
    </Content>
  );
};

export default ProductPage;
