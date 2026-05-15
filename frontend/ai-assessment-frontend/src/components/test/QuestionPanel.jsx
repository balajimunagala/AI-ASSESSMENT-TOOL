import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "../ui-stubs";

export function QuestionPanel({ test }) {

  // 🛑 Handle loading state
  if (!test) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading question...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      <Tabs defaultValue="description" className="w-full">

        {/* Tabs */}
        <TabsList className="w-full flex justify-center gap-2">
          <TabsTrigger value="description" className="w-full">
            Description
          </TabsTrigger>
          <TabsTrigger value="hints" className="w-full">
            Hints
          </TabsTrigger>
          <TabsTrigger value="submissions" className="w-full">
            Submissions
          </TabsTrigger>
        </TabsList>

        {/* ================= DESCRIPTION ================= */}
        <TabsContent value="description" className="mt-4 space-y-4">

          {/* Title + Difficulty */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                {test.difficulty}
              </Badge>
            </div>

            <h2 className="text-xl font-bold">
              {test.title}
            </h2>
          </div>

          {/* Question */}
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-foreground/90">
              {test.question}
            </p>
          </div>

          {/* Placeholder (you can upgrade later) */}
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
            <p className="text-sm">
              <strong className="text-primary">Note:</strong> Additional examples,
              constraints, and hints can be added later.
            </p>
          </div>

        </TabsContent>

        {/* ================= HINTS ================= */}
        <TabsContent value="hints" className="mt-4">
          <div className="text-sm text-muted-foreground">
            No hints available for this problem yet.
          </div>
        </TabsContent>

        {/* ================= SUBMISSIONS ================= */}
        <TabsContent value="submissions" className="mt-4">
          <div className="text-center py-6 text-muted-foreground">
            <p>No submissions yet.</p>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}