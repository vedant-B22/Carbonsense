import ActionTracker from "@/components/ActionTracker";

export const metadata = {
  title: "Tracker — CarbonSense",
  description: "Checklist of 20 actionable green decisions to reduce your carbon emissions.",
};

export default function TrackerPage() {
  return (
    <div className="w-full space-y-8 py-6">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
          Action <span className="text-accent">Tracker</span>
        </h1>
        <p className="text-sm font-body text-textMuted leading-relaxed">
          Commit to these 20 climate-positive actions. Track your cumulative carbon savings in real-time.
        </p>
      </div>
      <ActionTracker />
    </div>
  );
}
