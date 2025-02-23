import { PageContainer, SectionContainer } from "@/components/layouts"
import { EditCategoryForm } from "../forms"

type EditCategoryPage = {
    params: Promise<{ id: string }>
}

export const EditCategoryPage = async ({ params }: EditCategoryPage) => {
    const id = (await params).id
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer padded container className="mt-10 min-h-screen gap-20">
                <section>
                    <EditCategoryForm categoryId={id} />
                </section>
            </SectionContainer>
        </PageContainer>
    )
}