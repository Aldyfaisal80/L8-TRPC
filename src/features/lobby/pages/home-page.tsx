"use client";
import { useToast } from "@/hooks/use-toast";
import { toast as sooner } from "sonner";
import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  // const todos = await api.todo.getAll();
  const { toast } = useToast();

  const handleSooner = () => {
    sooner.success("Hello Wolrd! I'm Sooner");
  };

  const handleToaster = () => {
    toast({
      title: "Hello Wolrd!",
      description: "I'm Toaster",
    });
  };
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Button
                onClick={handleSooner}
                className="flex min-h-max flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <h3 className="text-2xl font-bold">Test Sooner</h3>
                <div className="text-lg">Click Me! And See What Happen</div>
              </Button>
              <Button
                onClick={handleToaster}
                className="flex min-h-max flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <h3 className="text-2xl font-bold">Test Toaster</h3>
                <div className="text-lg">Click Me! And See What Happen</div>
              </Button>
            </div>
          </div>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};
