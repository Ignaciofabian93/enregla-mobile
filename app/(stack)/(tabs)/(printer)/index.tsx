import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import Header from "@/app/ui/print/header";
import TemplateMenu from "@/app/ui/print/tempmenu";

export default function Printer() {
  return (
    <>
      <Layout>
        <Container>
          <Header title="Seleccionar plantilla" />
          <TemplateMenu />
        </Container>
      </Layout>
    </>
  );
}