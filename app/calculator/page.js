import CarbonForm from "@/components/CarbonForm";

export const metadata = {
  title: "Calculator — CarbonSense",
  description: "Step-by-step calculator for transport, home energy, food, and lifestyle carbon footprint.",
};

export default function CalculatorPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <div className="text-center max-w-xl mb-10">
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
          Footprint <span className="text-accent">Calculator</span>
        </h1>
        <p className="text-sm font-body text-textMuted leading-relaxed">
          Provide your energy, transport, food, and consumption habits. We calculate your carbon footprint using certified standards.
        </p>
      </div>
      <CarbonForm />
    </div>
  );
}
