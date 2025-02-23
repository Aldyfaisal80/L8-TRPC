import { PageContainer, SectionContainer } from "@/components/layouts"
import { CreateCategoryForm } from "../forms"

export const CreateCategoryPage = () => {
    
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer padded container className="mt-10 min-h-screen gap-20">
                <section>
                    <CreateCategoryForm  />
                </section>
            </SectionContainer>
        </PageContainer>
    )
}