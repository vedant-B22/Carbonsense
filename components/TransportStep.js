import React from "react";
import { INPUT_LIMITS } from "@/lib/constants";

/**
 * TransportStep component.
 * Renders the transportation parameters section of the calculator form.
 * @param {Object} props - React props.
 * @param {Object} props.inputs - The transport inputs state values.
 * @param {Function} props.onChange - Handles changes for input fields.
 * @returns {React.ReactElement} The transport fields layout.
 */
export default function TransportStep({ inputs, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-text">Step 1: Transportation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="carKm" className="block text-sm text-textMuted mb-2 font-medium">Car Travel (km / week)</label>
          <input
            type="number"
            id="carKm"
            min={INPUT_LIMITS.transport.carKm.min}
            max={INPUT_LIMITS.transport.carKm.max}
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.carKmPerWeek || ""}
            onChange={(e) => onChange("transport", "carKmPerWeek", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="publicHours" className="block text-sm text-textMuted mb-2 font-medium">Public Transport (hours / week)</label>
          <input
            type="number"
            id="publicHours"
            min={INPUT_LIMITS.transport.publicHours.min}
            max={INPUT_LIMITS.transport.publicHours.max}
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.publicHoursPerWeek || ""}
            onChange={(e) => onChange("transport", "publicHoursPerWeek", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="flights" className="block text-sm text-textMuted mb-2 font-medium">Flights taken per year</label>
          <input
            type="number"
            id="flights"
            min={INPUT_LIMITS.transport.flights.min}
            max={INPUT_LIMITS.transport.flights.max}
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.flightsPerYear || ""}
            onChange={(e) => onChange("transport", "flightsPerYear", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="flightClass" className="block text-sm text-textMuted mb-2 font-medium">Average Flight Class</label>
          <select
            id="flightClass"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.flightClass}
            onChange={(e) => onChange("transport", "flightClass", e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
      </div>
    </div>
  );
}
