'use client';
import { PageContainer, SectionContainer } from "@/components/layouts";
import { api } from "@/trpc/client";
import { CategoryTable } from "../tables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";


export const CategoryPage = () => {
    const { data: categories, isLoading: isCategoriesLoading, refetch: refetchCategories } = api.category.getAll.useQuery();
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer padded container className="mt-10 min-h-screen gap-10">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            All categories
                        </p>
                    </CardContent>
                </Card>

                <section>
                    <div className="flex justify-end mb-8">
                        <Button asChild variant="secondary">
                            <Link href={"/category/create"}>
                                Add New Categories<NotebookPen />
                            </Link>
                        </Button>

                    </div>
                    <CategoryTable
                        categories={categories}
                        isCategoriesLoading={isCategoriesLoading}
                        refetchCategories={refetchCategories}
                    />
                </section>
            </SectionContainer>
        </PageContainer>
    );
};
