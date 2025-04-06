import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  description: string;
}

export function StatsCard({
  title,
  value,
  trend,
  description,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium text-gray-500">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <span className="ml-2 text-sm font-medium text-green-600">
              {trend}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
