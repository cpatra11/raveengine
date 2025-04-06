import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ContentGenerationHub() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="bg-white border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Transformation Templates
          </h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Social Media Post", count: 18 },
              { name: "Case Study", count: 7 },
              { name: "Sales Deck Slide", count: 12 },
              { name: "Website Testimonial", count: 24 },
            ].map((template) => (
              <div
                key={template.name}
                className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer bg-white"
              >
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Generated {template.count} times
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-white border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Transformations
          </h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                type: "Social Media Post",
                date: "Apr 5",
                status: "Ready to use",
              },
              { type: "Case Study", date: "Apr 3", status: "Needs review" },
              { type: "Sales Deck", date: "Apr 1", status: "Ready to use" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{item.type}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    item.status === "Ready to use"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  )}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
