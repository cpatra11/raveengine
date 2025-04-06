"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface PlanFeature {
  text: string;
  available: boolean;
}

interface Plan {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PlanFeature[];
  popular?: boolean;
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans: Record<string, Plan> = {
    free: {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      features: [
        { text: "1 Project", available: true },
        { text: "5 Testimonials/month", available: true },
        { text: "1 Basic Template", available: true },
        { text: "Brand Control", available: false },
        { text: "Solo Team Member", available: true },
        { text: "Basic Analytics", available: true },
      ],
    },
    starter: {
      name: "Starter",
      price: { monthly: 15, annual: 10 },
      features: [
        { text: "10 Testimonials/month", available: true },
        { text: "3 Projects/month", available: true },
        { text: "3 Basic Templates", available: true },
        { text: "Brand Control", available: false },
        { text: "Solo Team Member", available: true },
        { text: "Basic Analytics", available: true },
      ],
    },
    pro: {
      name: "Pro",
      popular: true,
      price: { monthly: 49, annual: 39 },
      features: [
        { text: "500 Testimonials/month", available: true },
        { text: "Unlimited Projects", available: true },
        { text: "10+ Advanced Templates", available: true },
        { text: "Custom Colors + Fonts", available: true },
        { text: "2 Team Members", available: true },
        { text: "A/B Testing Analytics", available: true },
      ],
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent 
          animate-fade-in"
        >
          Choose Your Plan
        </h2>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span
            className={cn("text-sm font-medium", !isAnnual && "text-blue-600")}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
          >
            <span className="sr-only">Toggle billing frequency</span>
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                isAnnual ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span
            className={cn("text-sm font-medium", isAnnual && "text-blue-600")}
          >
            Annual
            <span className="ml-1.5 inline-block px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
              Save up to 33%
            </span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.entries(plans).map(([key, plan]) => (
            <div key={key} className="relative group">
              <div
                className={cn(
                  "absolute -inset-1 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500",
                  key === "free"
                    ? "bg-gradient-to-r from-gray-200 to-gray-300"
                    : key === "starter"
                    ? "bg-gradient-to-r from-blue-200 to-blue-300"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 opacity-75"
                )}
              ></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:scale-[1.02] transition-transform duration-300">
                {plan.popular && (
                  <div className="absolute -top-4 right-4">
                    <span
                      className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r 
                      from-blue-600 to-purple-600 text-white rounded-full"
                    >
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price[isAnnual ? "annual" : "monthly"] === 0
                      ? "Free"
                      : `$${plan.price[isAnnual ? "annual" : "monthly"]}`}
                  </span>
                  {plan.price[isAnnual ? "annual" : "monthly"] > 0 && (
                    <span className="text-gray-500 ml-2">/month</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.available ? (
                        <CheckIcon
                          className={cn(
                            "mr-3",
                            key === "pro" ? "text-blue-500" : "text-green-500"
                          )}
                        />
                      ) : (
                        <MinusIcon className="mr-3 opacity-50" />
                      )}
                      <span className={!feature.available ? "opacity-50" : ""}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full py-3 px-6 rounded-lg transition-all duration-200",
                    key === "free"
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : key === "starter"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                  )}
                >
                  {key === "free" ? "Get Started" : "Upgrade Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-5 h-5", className)}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-5 h-5", className)}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
