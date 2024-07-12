import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import Form from "@/app/ui/print/form";
import Header from "@/app/ui/print/header";

export default function PrintForm() {
  return (
    <>
      <Layout>
        <Container>
          <Header title="Datos" canGoBack />
          <Form />
        </Container>
      </Layout>
    </>
  );
}
