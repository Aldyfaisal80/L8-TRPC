import { PageContainer, SectionContainer } from "@/components/layouts"
import { EditProductForm } from "../forms"

type ProductEditPageProps = {
    params: Promise<{ id: string }>
}

export const ProductEditPage = async ({ params }: ProductEditPageProps) => {
    const id = (await params).id
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer padded container className="mt-10 min-h-screen gap-20">
                <section>
                    <EditProductForm productId={id} />
                </section>
            </SectionContainer>
        </PageContainer>
    )
}