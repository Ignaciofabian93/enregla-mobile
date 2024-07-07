import Layout from "../ui/layout";
import Header from "../ui/login/header";
import Form from "../ui/login/form";
import Footer from "../ui/login/footer";
import Container from "../ui/login/container";

export default function Login() {
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Form />
          <Footer />
        </Container>
      </Layout>
    </>
  );
}
