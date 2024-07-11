import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import Content from "@/app/ui/profile/content";
import Footer from "@/app/ui/profile/footer";
import Header from "@/app/ui/profile/header";

export default function Profile() {
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Content />
          <Footer />
        </Container>
      </Layout>
    </>
  );
}
