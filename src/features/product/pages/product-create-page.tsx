import { PageContainer, SectionContainer } from "@/components/layouts"
import { CreateProductForm } from "../forms"

export const ProductCreatePage = () => {
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer padded container className="mt-10 min-h-screen gap-20">
                <section>
                    <CreateProductForm />
                </section>
            </SectionContainer>
        </PageContainer>
    )
}