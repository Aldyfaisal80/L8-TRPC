'use client';
import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { ProductTable } from "../tables/ProductTable";
import { api } from "@/trpc/client";

export const ProductPage = () => {
    const { data: products, isLoading: isProductsLoading, refetch: refetchProducts } = api.product.getAll.useQuery()

    return (
        <PageContainer withHeader withFooter>
            <SectionContainer padded container className="mt-10 min-h-screen gap-10">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            All Products
                        </p>
                    </CardContent>
                </Card>
                <section>
                    <div className="flex justify-end mb-8">
                        <Button asChild variant="secondary">
                            <Link href={"/product/create"}>
                                Add New Product<NotebookPen />
                            </Link>
                        </Button>
                    </div>
                </section>

                <ProductTable
                    products={products}
                    isProductsLoading={isProductsLoading}
                    refetchProducts={refetchProducts}
                />
            </SectionContainer>
        </PageContainer>
    )
};