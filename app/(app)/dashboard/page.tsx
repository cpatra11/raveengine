import { auth } from "@/auth";
import posthog from "posthog-js";
import React from "react";

const Dashboard = async () => {
  const data = await auth();
  const bhalu = posthog.capture("my event", { property: "value" });
  console.log("User data:", data);
  return <div>{data.user.name}</div>;
};

export default Dashboard;
