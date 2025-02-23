export const MainLoader = () => {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="ml-2">Loading...</span>
        </div>
        <p className="text-muted-foreground">Please wait a moment...</p>
      </div>
    </div>
  )
};
