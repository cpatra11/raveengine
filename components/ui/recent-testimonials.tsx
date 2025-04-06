import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export function RecentTestimonials() {
  return (
    <Card className="mb-8 overflow-hidden">
      <CardHeader className="bg-white px-6 py-4 flex flex-row justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Recent Testimonials
        </h3>
        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
          Import New
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Potential
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Google Review
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  &ldquo;Their service completely transformed our customer
                  acquisition process...&rdquo;
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  High Value
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Positive
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-04-05
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Wand2 className="h-4 w-4 mr-1" />
                    Transform
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Trustpilot
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  &ldquo;We&apos;ve been using their platform for 6 months and
                  have seen a 40% increase in conversion...&rdquo;
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Case Study
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Positive
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-04-03
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Wand2 className="h-4 w-4 mr-1" />
                    Transform
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
