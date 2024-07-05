import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import Footer from "@/app/ui/profile/footer";
import Header from "@/app/ui/profile/header";

export default function Profile() {
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Footer />
        </Container>
      </Layout>
    </>
  );
}
